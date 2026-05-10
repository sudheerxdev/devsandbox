import { useQuery } from '@tanstack/react-query';
import { healthService } from '@/services';

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => healthService.check(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
