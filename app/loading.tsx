export default function Loading() {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cosmic-purple animate-spin"></div>
        </div>
        <p className="text-white text-lg font-medium">Loading RhythmFlow AI...</p>
      </div>
    </div>
  );
}
