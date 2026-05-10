import { Controller, Get, Post, Delete, Param, Body, ApiOperation, ApiResponse } from '@nestjs/common';
import { AnalysisService, AnalysisJob } from './analysis.service';

@Controller('api/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'List all analysis jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs' })
  async listJobs(): Promise<AnalysisJob[]> {
    return this.analysisService.listJobs();
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get analysis job details' })
  @ApiResponse({ status: 200, description: 'Job details' })
  async getJob(@Param('id') id: string): Promise<AnalysisJob | null> {
    return this.analysisService.getJob(id);
  }

  @Post('jobs')
  @ApiOperation({ summary: 'Create new analysis job' })
  @ApiResponse({ status: 201, description: 'Job created' })
  async createJob(@Body() data: { name: string }): Promise<AnalysisJob> {
    return this.analysisService.createJob(data.name);
  }

  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete analysis job' })
  @ApiResponse({ status: 200, description: 'Job deleted' })
  async deleteJob(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.analysisService.deleteJob(id);
    return { success };
  }
}
