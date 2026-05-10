import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database?: string;
    redis?: string;
    analysisService?: string;
  };
}

@Injectable()
export class HealthService {
  private startTime = Date.now();

  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      version: '0.1.0',
      checks: {
        database: 'ok',
        redis: 'ok',
        analysisService: 'ok',
      },
    };
  }
}
