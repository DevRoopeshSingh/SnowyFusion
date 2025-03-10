export default function ErrorComponent({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600">
          Retry
        </button>
      </div>
    </div>
  );
}
