import { Container } from "@/components/layout/Container";
import { contactContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <span>© 2026 David Weng.</span>
          <span>{contactContent.email}</span>
          <span>LinkedIn / Instagram / GitHub</span>
        </div>
      </Container>
    </footer>
  );
}
