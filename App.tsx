
import React, { useState, useMemo } from 'react';
import { Branch, AuditSession, AuditResult } from './types';
import { ZERO_TOLERANCE_ITEMS, OPERATIONAL_ITEMS } from './constants';
import ChecklistItemCard from './components/ChecklistItemCard';
import { getAuditSuggestions } from './services/geminiService';

// Using the exact logo URL provided in your prompt
const LOGO_URL = 'https://generativelabs-prod--static-bucket.s3.us-west-2.amazonaws.com/67bb3365f577f88417c82305/0c176e73-9a3d-4c3d-b286-98eb10f3c509.png';

// User Database
const AUTHORIZED_USERS = [
  { name: 'Admin User', username: 'admin', password: 'admin' },
  { name: 'Henry Liu', username: 'Henry Liu', password: 'Wylb19910428' },
  { name: 'David Liu', username: 'David Liu', password: '88888888' },
  { name: 'Tharaka Eshan', username: 'Tharaka Eshan', password: '11111111' },
  { name: 'Himal Godakanda', username: 'Himal Godakanda', password: '22222222' }
];

interface EnhancedSession extends AuditSession {
  auditDate: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'branch' | 'audit' | 'summary'>('login');
  const [user, setUser] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState<{ name: string; username: string } | null>(null);
  const [logoError, setLogoError] = useState(false);
  
  const [session, setSession] = useState<EnhancedSession>({
    branch: null,
    auditor: '',
    startTime: '',
    auditDate: '',
    results: {}
  });

  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = AUTHORIZED_USERS.find(
      (u) => u.username.toLowerCase() === user.username.trim().toLowerCase() && u.password === user.password
    );

    if (foundUser) {
      setCurrentUser({ name: foundUser.name, username: foundUser.username });
      setView('branch');
    } else {
      alert('Invalid credentials. Please check your username and password.');
    }
  };

  const selectBranch = (branch: Branch) => {
    const now = new Date();
    setSession({
      branch,
      auditor: currentUser?.name || 'Authorized Auditor',
      startTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      auditDate: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      results: {}
    });
    setView('audit');
  };

  const updateResult = (result: AuditResult) => {
    setSession(prev => ({
      ...prev,
      results: { ...prev.results, [result.itemId]: result }
    }));
  };

  const anyRedLineFailed = useMemo(() => {
    return ZERO_TOLERANCE_ITEMS.some(item => 
      session.results[item.id]?.status === 'fail'
    );
  }, [session.results]);

  const score = useMemo(() => {
    if (anyRedLineFailed) return 0;
    let totalScore = 0;
    OPERATIONAL_ITEMS.forEach(item => {
      const result = session.results[item.id];
      if (result?.status === 'pass') {
        totalScore += item.points;
      }
    });
    return totalScore;
  }, [session.results, anyRedLineFailed]);

  const finishAudit = async () => {
    setIsGeneratingAi(true);
    setView('summary');
    const failedOnes = [...ZERO_TOLERANCE_ITEMS, ...OPERATIONAL_ITEMS]
      .filter(item => session.results[item.id]?.status === 'fail')
      .map(item => ({ item, result: session.results[item.id]! }));
    const suggestions = await getAuditSuggestions(failedOnes);
    setAiSuggestions(suggestions);
    setIsGeneratingAi(false);
  };

  const isComplete = useMemo(() => {
    if (anyRedLineFailed) return true;
    const allIds = [...ZERO_TOLERANCE_ITEMS, ...OPERATIONAL_ITEMS].map(i => i.id);
    return allIds.every(id => {
      const result = session.results[id] as AuditResult | undefined;
      return result?.status && result.status !== 'none';
    });
  }, [session.results, anyRedLineFailed]);

  const progress = useMemo(() => {
    const total = ZERO_TOLERANCE_ITEMS.length + OPERATIONAL_ITEMS.length;
    const resultsArray = Object.values(session.results) as AuditResult[];
    const answered = resultsArray.filter(r => r.status !== 'none').length;
    return Math.round((answered / total) * 100);
  }, [session.results]);

  const handlePrint = () => {
    window.print();
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
          <div className="flex flex-col items-center mb-10 text-center">
            {/* Logo Container */}
            <div className="relative w-64 h-64 mb-4 flex items-center justify-center">
              {!logoError ? (
                <img 
                  src={LOGO_URL} 
                  alt="BING CHUN Mascot" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-blue-100 w-48 h-48 rounded-full border-4 border-blue-200">
                   <span className="text-6xl">🥤</span>
                   <span className="text-xs text-blue-600 mt-4 font-black uppercase tracking-widest">BING CHUN</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">BING CHUN</h1>
            <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full mt-2 tracking-[0.2em] uppercase">
              Store Audit Portal
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 ml-1">Auditor Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all text-gray-800 font-medium"
                  placeholder="e.g. Henry Liu"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 ml-1">Access Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all text-gray-800"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 hover:shadow-blue-200 active:scale-95"
            >
              Enter Dashboard
            </button>
            
            <div className="pt-4 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest px-1">
              <span>Secure Access</span>
              <span>v2.2.0</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ... rest of the component views (branch, audit, summary) remain same as provided in previous full App.tsx ...
  if (view === 'branch') {
    return (
      <div className="min-h-screen p-6 max-w-2xl mx-auto flex flex-col justify-center">
        <header className="text-center mb-10">
          <div className="text-blue-600 font-bold text-sm mb-2 uppercase tracking-widest">Welcome, {currentUser?.name}</div>
          <h2 className="text-3xl font-black text-blue-900">Select Branch</h2>
          <p className="text-gray-500 mt-2">Choose the location to start today's inspection</p>
        </header>
        <div className="grid gap-4">
          {Object.values(Branch).map((b) => (
            <button
              key={b}
              onClick={() => selectBranch(b)}
              className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 shadow-sm flex items-center justify-between transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800">{b} Branch</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'audit') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm px-6 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black text-blue-900 uppercase">{session.branch} BRANCH</h1>
              <p className="text-xs text-gray-500 font-medium tracking-tight">Auditor: {session.auditor} • Started: {session.startTime}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-600 leading-none">{progress}%</div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          {anyRedLineFailed && (
            <div className="mb-8 p-4 bg-red-100 border-2 border-red-500 rounded-2xl flex items-center gap-3 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-900 font-bold">Critical Violation Detected</h3>
                <p className="text-red-700 text-sm">A Zero Tolerance requirement has failed. This store will receive a 0 score.</p>
              </div>
            </div>
          )}

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded tracking-widest">CRITICAL</span>
              <h2 className="text-xl font-bold text-red-900">Zero Tolerance Requirements</h2>
            </div>
            {ZERO_TOLERANCE_ITEMS.map(item => (
              <ChecklistItemCard
                key={item.id}
                item={item}
                result={session.results[item.id] || { itemId: item.id, status: 'none' }}
                onChange={updateResult}
              />
            ))}
          </section>

          <section className={anyRedLineFailed ? 'opacity-40 pointer-events-none grayscale' : ''}>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded tracking-widest">OPERATIONAL</span>
              <h2 className="text-xl font-bold text-blue-900">General Standards Checklist</h2>
            </div>
            {OPERATIONAL_ITEMS.map(item => (
              <ChecklistItemCard
                key={item.id}
                item={item}
                result={session.results[item.id] || { itemId: item.id, status: 'none' }}
                onChange={updateResult}
              />
            ))}
          </section>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-20">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
            <div className="hidden sm:block">
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Est. Final Score</div>
              <div className={`text-2xl font-black ${anyRedLineFailed ? 'text-red-600' : 'text-blue-900'}`}>{score} pts</div>
            </div>
            <button
              onClick={finishAudit}
              disabled={!isComplete}
              className={`flex-1 sm:flex-none px-12 py-4 rounded-xl font-bold text-lg transition-all ${
                isComplete 
                ? (anyRedLineFailed ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700') 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
            >
              {anyRedLineFailed ? 'Fail Store & Finalize' : (isComplete ? 'Complete Inspection' : `Audit Progress (${progress}%)`)}
            </button>
          </div>
        </footer>
      </div>
    );
  }

  if (view === 'summary') {
    const failedOnes = [...ZERO_TOLERANCE_ITEMS, ...OPERATIONAL_ITEMS]
      .filter(item => session.results[item.id]?.status === 'fail');

    return (
      <div className="min-h-screen bg-gray-50 p-6 print:p-0 print:bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Report Header */}
          <header className={`p-8 rounded-3xl mb-8 shadow-xl print:shadow-none print:rounded-none print:bg-white print:text-black print:border-b-4 print:border-gray-900 ${anyRedLineFailed ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">Audit Report</h1>
                <p className="font-bold opacity-90 text-lg uppercase">{session.branch} Branch • {session.auditDate}</p>
                <div className="flex items-center gap-4 mt-4">
                   <div className="text-xs opacity-75 font-black uppercase tracking-tighter bg-white/10 px-3 py-1 rounded">
                     Auditor: {session.auditor}
                   </div>
                   <div className="text-xs opacity-75 font-black uppercase tracking-tighter bg-white/10 px-3 py-1 rounded">
                     Time: {session.startTime}
                   </div>
                </div>
              </div>
              <div className={`bg-white p-6 rounded-2xl shadow-lg ${anyRedLineFailed ? 'text-red-600' : 'text-blue-900'} text-center print:border-2 print:border-gray-900 min-w-[140px]`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-1">Final Score</div>
                <div className="text-6xl font-black">{score}</div>
              </div>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* AI Section */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 no-print page-break-inside-avoid">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Action Plan
                </h2>
                {isGeneratingAi ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-500 font-bold uppercase text-xs">Analyzing compliance gaps...</p>
                  </div>
                ) : (
                  <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed font-medium">
                    <div className="whitespace-pre-wrap">{aiSuggestions}</div>
                  </div>
                )}
              </section>

              {/* Detailed Findings */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Compliance Observations</h2>
                {failedOnes.length > 0 ? (
                  <div className="space-y-6">
                    {failedOnes.map(item => (
                      <div key={item.id} className="p-5 rounded-2xl bg-white border-2 border-red-50 page-break-inside-avoid print:border print:border-gray-200">
                        <div className="flex justify-between items-center font-black mb-3">
                          <span className="text-red-900 text-lg">Item #{item.id}: {item.title}</span>
                          <span className="text-[10px] bg-red-100 text-red-700 px-3 py-1 rounded-full uppercase tracking-tighter">Violation</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 italic text-gray-800 text-sm">
                          "{session.results[item.id].comment || 'No comment provided.'}"
                        </div>
                        {session.results[item.id].photo && (
                          <div className="mt-4">
                            <p className="text-[10px] text-gray-400 font-black uppercase mb-2 tracking-widest">Evidence Photo</p>
                            <img 
                              src={session.results[item.id].photo} 
                              alt="Observation evidence" 
                              className="w-full max-h-[300px] object-cover rounded-2xl border-2 border-gray-100 shadow-sm" 
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-green-50 rounded-3xl border-2 border-green-100 print:bg-white print:border-gray-200">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-800 font-black text-2xl uppercase tracking-tight">Full Compliance</p>
                    <p className="text-green-600 font-medium mt-2">No violations were observed during this inspection.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6 print:absolute print:right-0 print:top-48 print:w-64">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 print:shadow-none print:border print:border-gray-900">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">Audit Registry</h3>
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] text-gray-400 font-black uppercase block mb-1">Assigned Auditor</span>
                    <span className="font-bold text-gray-900 text-sm">{session.auditor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-black uppercase block mb-1">Branch Name</span>
                    <span className="font-bold text-gray-900 text-sm">{session.branch}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-black uppercase block mb-1">Effective Date</span>
                    <span className="font-bold text-blue-700 text-sm">{session.auditDate}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-black uppercase">Start Time</span>
                    <span className="text-xs font-bold text-gray-800">{session.startTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 no-print">
                <button
                  onClick={handlePrint}
                  disabled={isGeneratingAi}
                  className={`w-full py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isGeneratingAi 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  {isGeneratingAi ? 'Preparing Report...' : 'Export PDF Report'}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all uppercase text-sm"
                >
                  New Audit Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
