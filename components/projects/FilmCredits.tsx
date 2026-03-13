import type { FilmCreditGroup, FilmCreditPerson, Locale } from "@/types/content";
import { projectLabel } from "@/content/projects";

export function FilmCreditGroupBlock({
  group,
  locale
}: {
  group: FilmCreditGroup;
  locale: Locale;
}) {
  return (
    <div className="project-film__credit-group">
      <h3 className="project-film__credit-role">{projectLabel(group.role, locale)}</h3>
      <ul className="project-film__credit-list">
        {group.people.map((person) => (
          <li key={`${group.role.en}-${person.name.en}`} className="project-film__credit-item">
            <FilmCreditPersonItem person={person} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilmCreditPersonItem({ person, locale }: { person: FilmCreditPerson; locale: Locale }) {
  const label = projectLabel(person.name, locale);
  const note = person.note ? projectLabel(person.note, locale) : null;

  return (
    <>
      {person.href ? (
        <a className="project-film__credit-link" href={person.href} rel="noreferrer" target="_blank">
          {label}
        </a>
      ) : (
        <span className="project-film__credit-text">{label}</span>
      )}
      {note ? <span className="project-film__credit-note">{note}</span> : null}
    </>
  );
}
