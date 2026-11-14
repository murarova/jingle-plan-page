export function Spinner({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={`${className} flex-none animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`${className} flex-none`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`${className} flex-none`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.5V6.9c0-.7.1-1.2 1.3-1.2H17V3h-2C12.4 3 11 4.4 11 6.7v1.8H9V11h2v10h3V11h2.4l.4-2.5h-2.8z" />
    </svg>
  );
}

export function AndroidIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={`${className} flex-none`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.5 10a6.5 6.5 0 0 1 13 0zM9 7.4a.9.9 0 1 0 1.8 0 .9.9 0 1 0-1.8 0zM13.2 7.4a.9.9 0 1 0 1.8 0 .9.9 0 1 0-1.8 0z"
      />
      <rect x="5.5" y="11" width="13" height="8" rx="1.5" />
      <rect x="2" y="11" width="2.5" height="6" rx="1.25" />
      <rect x="19.5" y="11" width="2.5" height="6" rx="1.25" />
      <rect x="8.5" y="17" width="2.6" height="4.6" rx="1.3" />
      <rect x="12.9" y="17" width="2.6" height="4.6" rx="1.3" />
      <path d="M8.4 4.6 7 2.2M15.6 4.6 17 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
