import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';
import HealthStatus from '@/components/HealthStatus';
import Dashboard from '@/pages/Dashboard';
import '@/styles/globals.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="absolute top-4 right-4">
          <HealthStatus />
        </div>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
