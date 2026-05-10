import apiClient from './api';
import { HealthCheckResponse, AnalysisJob } from '@/types/api';

export const healthService = {
  async check(): Promise<HealthCheckResponse> {
    const response = await apiClient.get('/health');
    return response.data.data;
  },
};

export const analysisService = {
  async listJobs(): Promise<AnalysisJob[]> {
    const response = await apiClient.get('/analysis/jobs');
    return response.data.data;
  },

  async getJob(id: string): Promise<AnalysisJob> {
    const response = await apiClient.get(`/analysis/jobs/${id}`);
    return response.data.data;
  },

  async createJob(data: { name: string; repositoryUrl: string }): Promise<AnalysisJob> {
    const response = await apiClient.post('/analysis/jobs', data);
    return response.data.data;
  },

  async deleteJob(id: string): Promise<void> {
    await apiClient.delete(`/analysis/jobs/${id}`);
  },
};
