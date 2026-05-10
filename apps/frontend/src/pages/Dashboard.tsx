import { useHealthCheck } from '@/hooks/useHealthCheck';

export default function Dashboard() {
  const { data, isLoading, error } = useHealthCheck();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to DevSandbox - Intelligent Code Analysis Platform</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-600">Error loading status</p>}
          {data && (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">Status:</span>{' '}
                <span className="font-semibold text-green-600">{data.status}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Version:</span> <span className="font-semibold">{data.version}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Uptime:</span>{' '}
                <span className="font-semibold">{(data.uptime / 1000 / 60).toFixed(2)}m</span>
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Analysis</h3>
          <p className="text-gray-600 text-sm">Analyze codebases and visualize architecture</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Start Analysis
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Dependencies</h3>
          <p className="text-gray-600 text-sm">View and manage project dependencies</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Graph
          </button>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-blue-600">1.</span>
            <span>Upload or connect your repository</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-600">2.</span>
            <span>Run code analysis</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-600">3.</span>
            <span>Explore the dependency graph</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-600">4.</span>
            <span>Validate architecture rules</span>
          </li>
        </ol>
      </section>
    </div>
  );
}
