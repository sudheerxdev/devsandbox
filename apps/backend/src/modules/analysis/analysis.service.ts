import { Injectable } from '@nestjs/common';

export interface AnalysisJob {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class AnalysisService {
  private jobs: Map<string, AnalysisJob> = new Map();

  async listJobs(): Promise<AnalysisJob[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: string): Promise<AnalysisJob | null> {
    return this.jobs.get(id) || null;
  }

  async createJob(name: string): Promise<AnalysisJob> {
    const id = Date.now().toString();
    const job: AnalysisJob = {
      id,
      name,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }
}
