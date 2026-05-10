// Shared utility functions will go here
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};
