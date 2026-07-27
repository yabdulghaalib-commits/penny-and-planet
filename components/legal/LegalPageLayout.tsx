import { Container } from '@/components/ui/Container';

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

/**
 * Shared shell for every policy/legal page (Privacy, Cookies, Disclosure,
 * Terms, Disclaimer). Keeps typography, spacing, and the jump-link nav
 * consistent across all of them — add a new legal page by composing this
 * layout with `LegalSection` blocks, not by hand-rolling markup.
 */
export function LegalPageLayout({ eyebrow, title, lastUpdated, intro, sections, children }: LegalPageLayoutProps) {
  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-content-narrow">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">{title}</h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated: {lastUpdated}</p>
          <p className="mt-6 text-body-lg text-ink-muted">{intro}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1100px] gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Sections on this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="eyebrow">On this page</p>
              <ul className="mt-3 space-y-2 border-l border-sand-300 pl-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="block text-sm leading-snug text-ink-muted transition-colors hover:text-forest-600">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="prose-editorial max-w-none">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function LegalSectionBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
