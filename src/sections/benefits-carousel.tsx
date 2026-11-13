import useEmblaCarousel from "embla-carousel-react";
import { useEffect, type CSSProperties } from "react";
import { Phone } from "@/components/phone";

interface CarouselItem {
  id: string;
  title: string;
  text: string;
  src: string;
  alt: string;
}

interface BenefitsCarouselProps {
  items: CarouselItem[];
  active: number;
  playing: boolean;
  intervalMs: number;
  label: string;
  onSelect: (index: number) => void;
  onUserInteract: () => void;
}

export function BenefitsCarousel({ items, active, playing, intervalMs, label, onSelect, onUserInteract }: BenefitsCarouselProps) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "center", duration: 26 });
  const item = items[active];

  useEffect(() => {
    if (!embla) return;
    const handleSelect = () => onSelect(embla.selectedScrollSnap());
    embla.on("select", handleSelect);
    embla.on("pointerDown", onUserInteract);
    return () => {
      embla.off("select", handleSelect);
      embla.off("pointerDown", onUserInteract);
    };
  }, [embla, onSelect, onUserInteract]);

  useEffect(() => {
    if (embla && embla.selectedScrollSnap() !== active) embla.scrollTo(active);
  }, [embla, active]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="overflow-hidden rounded-[32px] bg-ivory-badge pt-5 md:hidden"
    >
      <div className="flex gap-1.5 px-5">
        {items.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            aria-label={entry.title}
            aria-current={index === active ? "true" : undefined}
            onClick={() => {
              onUserInteract();
              onSelect(index);
            }}
            className="group flex h-6 flex-1 cursor-pointer items-center"
          >
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-ink/15">
              {index < active || (index === active && !playing) ? (
                <span className="absolute inset-0 rounded-full bg-leaf-deep" />
              ) : null}
              {index === active && playing ? (
                <span
                  key={`${active}-progress`}
                  style={{ "--slide-ms": `${intervalMs}ms` } as CSSProperties}
                  className="tab-progress absolute inset-0 rounded-full bg-leaf-deep"
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <div className="px-6 pt-4 text-center" aria-live="polite">
        <h3 key={`${item.id}-title`} className="text-in text-[22px] font-bold leading-[1.15] tracking-[-0.01em]">
          {item.title}
        </h3>
        <p key={`${item.id}-text`} className="text-in mt-1.5 min-h-[3.1rem] text-[15px] leading-snug text-muted">
          {item.text}
        </p>
      </div>
      <div
        ref={viewportRef}
        className="mt-4 h-[372px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
      >
        <div className="flex touch-pan-y">
          {items.map((entry, index) => (
            <div
              key={entry.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${items.length}`}
              className="min-w-0 flex-none basis-[232px] pl-4"
            >
              <div
                className={`origin-top transition-[transform,opacity] duration-500 ease-out ${
                  index === active ? "scale-100 opacity-100" : "scale-[0.88] opacity-45"
                }`}
              >
                <Phone src={entry.src} alt={entry.alt} eager={index === 0} className="[--w:216px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
