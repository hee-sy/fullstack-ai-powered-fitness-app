export interface Recommendation {
  id: string;
  activityId: string;
  userId: string;
  activityType: string;
  analysis: string;
  improvements: string[];
  suggestions: string[];
  safety: string[];
  createdAt: string;
}
