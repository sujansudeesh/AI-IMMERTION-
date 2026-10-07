/** Public, redacted record summaries. Private research belongs outside the repo. */
export interface EvidenceRecord {
  id: string;
  date: string;
  evidenceRef: string;
}

export interface ParticipantRecord {
  id: string;
  role: string;
  consentForRedactedUse: boolean;
}

export interface InterviewRecord extends EvidenceRecord {
  participantId: string;
}

export interface ObservationRecord extends EvidenceRecord {
  role: string;
}

export interface AiRecord extends EvidenceRecord {
  kind: 'original' | 'retrospective' | 'current_revision';
  alternatives: string[];
  humanDecision: string | null;
}

export interface TestRecord extends EvidenceRecord {
  participantId: string;
  buildRef: string;
  tasks: {
    id: string;
    outcome: 'independent' | 'assisted' | 'failed' | 'not_attempted';
  }[];
  feedback: string;
}

export interface ChangeRecord extends EvidenceRecord {
  testId: string;
  decision: string;
  implementationRef: string | null;
  retestRef: string | null;
}

export interface AlternativeRecord {
  id: string;
  name: string;
  benefit: string;
  limitation: string;
  test: string;
  status: string;
}

export interface ProjectReviewEvidence {
  schemaVersion: number;
  project: string;
  title: string;
  revisionDate: string;
  baselineCommit: string;
  reportStatus: string;
  problemStatement: string;
  hmw: string;
  pathway: {
    selected: 'A' | 'B' | null;
    confirmedOn: string | null;
    evidenceRef: string | null;
  };
  participants: ParticipantRecord[];
  interviews: InterviewRecord[];
  observations: ObservationRecord[];
  aiSessions: AiRecord[];
  alternatives: AlternativeRecord[];
  tests: TestRecord[];
  changes: ChangeRecord[];
  technicalVerification: {
    buildStatus: 'not_run' | 'pass' | 'fail';
    buildRef: string | null;
    evidenceRef: string | null;
    demoEvidenceRef: string | null;
  };
  assessment: {
    review1Marks: number;
    review1Maximum: number;
    source: string;
    review2Milestone: string;
  };
}
