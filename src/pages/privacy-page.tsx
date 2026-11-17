import { ShortHeader } from "@/components/short-header";
import { privacyPolicy, type PrivacyBlocks } from "@/content/privacy-policy";
import { Footer } from "@/sections/footer";

const linkClass = "font-bold text-leaf-deep underline decoration-candy decoration-2 underline-offset-4";

export function PrivacyPage() {
  return (
    <>
      <header id="top" className="hero-bg text-white">
        <ShortHeader />
      </header>
      <main className="py-[72px]">
        <article className="wrap">
          <div className="mx-auto grid max-w-[760px] gap-10 text-[16px] leading-relaxed text-muted">
            <div>
              <h1 className="text-[clamp(32px,6vw,44px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
                {privacyPolicy.title}
              </h1>
              <p className="mt-4 text-[15px]">Дата останнього оновлення: {privacyPolicy.updated}</p>
            </div>
            {privacyPolicy.sections.map((section) => (
              <section key={section.title} className="grid gap-4">
                <h2 className="text-[clamp(22px,4vw,28px)] font-bold leading-tight tracking-[-0.02em] text-ink">
                  {section.title}
                </h2>
                <Blocks blocks={section.blocks} />
                {section.parts?.map((part) => (
                  <div key={part.title} className="grid gap-3">
                    <h3 className="text-[18px] font-bold leading-snug text-ink">{part.title}</h3>
                    <Blocks blocks={part.blocks} />
                  </div>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Blocks({ blocks }: { blocks: PrivacyBlocks }) {
  return (
    <div className="grid gap-3">
      {blocks.map((block, index) =>
        block.kind === "list" ? (
          <ul key={index} className="grid list-disc gap-2 pl-5">
            {block.items.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={index}>
            <Rich text={block.text} />
          </p>
        ),
      )}
    </div>
  );
}

function Rich({ text }: { text: string }) {
  const chunks = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g);
  return chunks.map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-ink">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    if (chunk.startsWith("http")) {
      const href = chunk.replace(/[.,;]+$/, "");
      return (
        <span key={index}>
          <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {href}
          </a>
          {chunk.slice(href.length)}
        </span>
      );
    }
    if (chunk.includes("@")) {
      return (
        <a key={index} href={`mailto:${chunk}`} className={linkClass}>
          {chunk}
        </a>
      );
    }
    return <span key={index}>{chunk}</span>;
  });
}
