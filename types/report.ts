export type ReportStatus = "pending" | "resolved";

export interface Report {
    id: number;
    type: "review" | "user" | "business" | "service" | "other";
    targetId: number;
    reason: string;
    status: ReportStatus;
    submittedBy: string;
    resolvedBy?: string;
    createdAt: Date;
}

export interface ReportFormValues {
    type: Report["type"];
  targetId: string;
  reason: Report["reason"];
  description?: string;
}