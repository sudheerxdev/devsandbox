// API Response types
export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

// Health check response
export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  uptime: number;
  version: string;
  timestamp: string;
}

// Analysis Job types
export interface AnalysisJob {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  progress: number;
}

// Dependency Graph types
export interface Dependency {
  id: string;
  name: string;
  version: string;
  type: 'internal' | 'external';
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'file' | 'module' | 'package';
}

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface DependencyGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
