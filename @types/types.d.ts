export type SourceType = "website" | "docs" | "upload" | "text";
export type SourceStatus = "active" | "training" | "error" | "excluded";

export interface KnowledgeSource {
  id: string;
  user_email: string;
  type: SourceType;
  name: string;
  status: SourceStatus;
  source_url: string | null;
  content: string | null;
  meta_data: string | null;
  last_updated: string | null;
  created_at: string | null;
}
