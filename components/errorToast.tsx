'use client';

interface ErrorToastProps {
  message: string;
}

function ErrorToast({ message }: ErrorToastProps) {
  if (!message) return null;

  return (
    <div className="animate-fade-up flex w-full min-w-0 max-w-lg items-center gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 backdrop-blur-sm">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <p className="min-w-0 break-words text-sm text-red-200">{message}</p>
    </div>
  );
}

export default ErrorToast;
