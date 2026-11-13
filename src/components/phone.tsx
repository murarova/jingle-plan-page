interface PhoneProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  imgKey?: string;
  fade?: boolean;
}

export function Phone({ src, alt, className = "", eager = false, imgKey, fade = false }: PhoneProps) {
  return (
    <div className={`phone ${className}`}>
      <img
        key={imgKey}
        src={src}
        alt={alt}
        width={810}
        height={1753}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={fade ? "screen-in" : undefined}
      />
    </div>
  );
}

interface PhoneStackProps {
  sources: string[];
  alts: string[];
  active: number;
  className?: string;
}

export function PhoneStack({ sources, alts, active, className = "" }: PhoneStackProps) {
  const total = sources.length;

  return (
    <div className={`phone relative ${className}`}>
      {sources.map((src, index) => {
        const distance = (index - active + total) % total;
        const position = distance === 0 ? "current" : distance === total - 1 ? "before" : "after";
        return (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={distance === 0 ? alts[index] : ""}
            aria-hidden={distance === 0 ? undefined : true}
            width={810}
            height={1753}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            data-position={position}
            className="phone-slide"
          />
        );
      })}
    </div>
  );
}
