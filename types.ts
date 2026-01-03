
export enum Branch {
  NUGEGODA = 'Nugegoda',
  PORT_CITY = 'Port City',
  BORELLA = 'Borella'
}

export enum SectionType {
  ZERO_TOLERANCE = 'Zero Tolerance Compliance',
  OTHER = 'Operational Standards'
}

export interface ChecklistItem {
  id: number;
  category: string;
  title: string;
  description: string;
  points: number;
  section: SectionType;
}

export interface AuditResult {
  itemId: number;
  status: 'pass' | 'fail' | 'none';
  comment?: string;
  photo?: string;
}

export interface AuditSession {
  branch: Branch | null;
  auditor: string;
  startTime: string;
  endTime?: string;
  results: Record<number, AuditResult>;
}
