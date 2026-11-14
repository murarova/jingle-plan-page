import type { ReactNode } from "react";

export function CandyPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 pb-8 pt-12 md:px-12 md:pb-12 md:pt-16 ${className}`}
    >
      <div className="candy-thin absolute inset-x-0 top-0" aria-hidden="true" />
      {children}
    </div>
  );
}
