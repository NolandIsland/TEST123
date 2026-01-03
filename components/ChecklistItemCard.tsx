
import React, { useState } from 'react';
import { ChecklistItem, AuditResult } from '../types';

interface ChecklistItemCardProps {
  item: ChecklistItem;
  result: AuditResult;
  onChange: (result: AuditResult) => void;
}

const ChecklistItemCard: React.FC<ChecklistItemCardProps> = ({ item, result, onChange }) => {
  const [showFailDetails, setShowFailDetails] = useState(result.status === 'fail');

  const handlePass = () => {
    setShowFailDetails(false);
    onChange({ itemId: item.id, status: 'pass' });
  };

  const handleFail = () => {
    setShowFailDetails(true);
    onChange({ itemId: item.id, status: 'fail', comment: result.comment || '' });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...result, comment: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...result, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`p-6 mb-4 rounded-2xl border transition-all shadow-sm ${
      result.status === 'pass' ? 'bg-green-50 border-green-200' : 
      result.status === 'fail' ? 'bg-red-50 border-red-200' : 
      'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
              result.status === 'pass' ? 'bg-green-100 text-green-700' : 
              result.status === 'fail' ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-500'
            }`}>
              {item.category}
            </span>
            <span className="text-gray-400 text-xs font-mono">#{item.id}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
        <div className="text-right min-w-[60px]">
          <div className="text-xs font-bold text-gray-400 uppercase">Points</div>
          <div className="text-xl font-black text-blue-600">{item.points}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePass}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${
            result.status === 'pass' 
              ? 'bg-green-600 text-white shadow-md' 
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-600'
          }`}
        >
          Pass
        </button>
        <button
          onClick={handleFail}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${
            result.status === 'fail' 
              ? 'bg-red-600 text-white shadow-md' 
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600'
          }`}
        >
          Fail
        </button>
      </div>

      {showFailDetails && (
        <div className="mt-4 pt-4 border-t border-red-100 animate-fadeIn">
          <label className="block text-xs font-bold text-gray-700 mb-2">Observation Notes</label>
          <textarea
            value={result.comment || ''}
            onChange={handleCommentChange}
            placeholder="Describe the non-compliance..."
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm bg-white mb-3"
            rows={2}
          />
          
          <div className="flex items-center gap-3">
            <label className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              Add Photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            {result.photo && (
              <div className="relative group">
                <img src={result.photo} alt="Evidence" className="h-10 w-10 object-cover rounded-lg border border-gray-200" />
                <button 
                  onClick={() => onChange({ ...result, photo: undefined })}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistItemCard;
