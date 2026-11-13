import logoLight from "@/assets/logo-light.webp";
import { SITE_NAME } from "@/config/site";

const RATIO = 660 / 145;

export function BrandWordmark({ height = 50, className = "" }: { height?: number; className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center no-underline ${className}`}>
      <img
        src={logoLight}
        alt={SITE_NAME}
        width={Math.round(height * RATIO)}
        height={height}
        style={{ height, width: "auto" }}
      />
    </a>
  );
}
