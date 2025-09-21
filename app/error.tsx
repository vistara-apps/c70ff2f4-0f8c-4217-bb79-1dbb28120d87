'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
      <div className="card-cosmic text-center max-w-md w-full">
        <div className="text-6xl mb-4">💃</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-white/80 mb-6">
          Don't worry, even the best dancers miss a step sometimes.
        </p>
        <button
          onClick={reset}
          className="btn-primary w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
