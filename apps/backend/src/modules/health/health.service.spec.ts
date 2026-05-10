import { HealthService } from '../modules/health/health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health status', () => {
    const health = service.getHealth();
    expect(health.status).toBe('ok');
    expect(health.version).toBe('0.1.0');
    expect(health.uptime).toBeGreaterThanOrEqual(0);
  });
});
