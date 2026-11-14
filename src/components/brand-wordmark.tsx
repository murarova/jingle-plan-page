import logoLight from "@/assets/logo-light.webp";
import { SITE_NAME } from "@/config/site";

const RATIO = 660 / 145;

export function BrandWordmark({
  height = 50,
  className = "",
  href = "#top",
  imageClassName = "",
}: {
  height?: number;
  className?: string;
  href?: string;
  imageClassName?: string;
}) {
  return (
    <a href={href} className={`inline-flex shrink-0 items-center no-underline ${className}`}>
      <img
        src={logoLight}
        alt={SITE_NAME}
        width={Math.round(height * RATIO)}
        height={height}
        className={imageClassName}
        style={imageClassName ? undefined : { height, width: "auto" }}
      />
    </a>
  );
}
