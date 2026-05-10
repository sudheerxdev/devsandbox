// API Types
export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

// Common types that will be shared across frontend and backend
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
