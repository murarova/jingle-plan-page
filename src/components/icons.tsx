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
