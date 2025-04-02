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

export interface ApiReport {
    id: string;
    type: "review" | "user" | "business" | "service" | "other";
    target_id: string;
    reason: string;
    status: ReportStatus;
    submitted_by: string;
    resolved_by?: string;
    createdAt: string;

}