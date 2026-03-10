import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { contactContent } from "@/content/site";

export function ContactSection() {
  return (
    <section className="section-shell" id="contact">
      <Container>
        <div className="contact__panel">
          <div className="contact__content">
            <p className="poster-section__eyebrow">{contactContent.eyebrow}</p>
            <h2 className="contact__title">{contactContent.title}</h2>
            <p className="contact__lead">{contactContent.lead}</p>
            <p className="contact__copy">{contactContent.body}</p>
            <div className="contact__actions">
              <Link className="button button--signal" href={`mailto:${contactContent.email}`}>
                Email Me
              </Link>
              <Link className="button button--ghost" href={contactContent.linkedinHref}>
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="contact__rail">
            <p className="poster-section__eyebrow">Best for</p>
            <ul className="contact__list">
              {contactContent.inquiryTypes.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
