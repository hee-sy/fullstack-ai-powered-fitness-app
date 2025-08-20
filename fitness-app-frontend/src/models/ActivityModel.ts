export interface Activity {
  id: string;
  userId: string;
  type: string;
  duration: string;
  caloriesBurned: string;
  startTime: string;
  additionalMetrics?: object;
  createdAt: string;
  updatedAt: string;
}
