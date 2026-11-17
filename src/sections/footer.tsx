import { TRACKING_ENABLED } from "@/analytics/config";
import { resetConsent, track } from "@/analytics/track";
import { Brand } from "@/components/brand";
import { SITE_NAME } from "@/config/site";
import { useI18n } from "@/hooks/use-i18n";
import { useSiteData } from "@/hooks/use-site-data";
import { contactsPath, offerPath, privacyPath } from "@/routes";

const linkClass = "no-underline hover:text-ink";

export function Footer() {
  const { lang, t } = useI18n();
  const { links } = useSiteData();

  return (
    <footer className="border-t border-ivory-line pb-8 pt-9 md:pb-12 text-sm text-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div>
          <Brand size={28} className="text-ink" />
          <p className="mt-2">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label={SITE_NAME}>
          <a
            href={offerPath(lang)}
            className={linkClass}
            onClick={() => track("click_public_offer", { placement: "footer" })}
          >
            {t.footer.terms}
          </a>
          <a
            href={privacyPath(lang)}
            className={linkClass}
            onClick={() => track("click_privacy_policy", { placement: "footer" })}
          >
            {t.footer.privacy}
          </a>
          <a
            href={contactsPath(lang)}
            className={linkClass}
            onClick={() => track("click_contacts", { placement: "footer" })}
          >
            {t.footer.contacts}
          </a>
          {links.instagram ? (
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t.footer.instagram}
            </a>
          ) : null}
          {TRACKING_ENABLED ? (
            <button type="button" onClick={resetConsent} className="cursor-pointer hover:text-ink">
              {t.footer.cookies}
            </button>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
