import { Controller, Get, ApiOperation, ApiResponse } from '@nestjs/common';
import { HealthService, HealthResponse } from './health.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({ status: 200, description: 'System is healthy' })
  checkHealth(): HealthResponse {
    return this.healthService.getHealth();
  }
}
