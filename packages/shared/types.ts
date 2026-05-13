
export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AnalysisJob {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  updatedAt: string;
}
