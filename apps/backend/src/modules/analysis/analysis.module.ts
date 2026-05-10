import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';

@Module({
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
