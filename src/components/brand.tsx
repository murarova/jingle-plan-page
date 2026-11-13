import logo from "@/assets/logo.webp";
import { SITE_NAME } from "@/config/site";

export function Brand({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 text-lg font-bold no-underline ${className}`}>
      <img src={logo} alt="" width={size} height={size} className="rounded-[10px]" style={{ width: size, height: size }} />
      {SITE_NAME}
    </a>
  );
}
