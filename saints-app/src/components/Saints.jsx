import { useState } from "react";
import saints from "../data/saints.json";
import { STRINGS } from "../i18n";

function initials(name) {
  return name
    .replace(/^(St\.?|Shën)\s+/i, "")
    .split(" ")
    .filter((w) => w.length > 2 || /[A-Z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Saints({ lang }) {
  const t = STRINGS[lang];
  const [active, setActive] = useState(null);
  const sq = lang === "sq";

  return (
    <>
      <div className="saints-grid">
        {saints.map((s) => (
          <button
            key={s.id}
            className="saint-card"
            onClick={() => setActive(s)}
          >
            <div className="initial">{initials(sq ? s.nameSq : s.name)}</div>
            <h3>{sq ? s.nameSq : s.name}</h3>
            <p className="role">{sq ? s.titleSq : s.title}</p>
            <p className="feast">{t.feast} &middot; {sq ? s.feastSq : s.feast}</p>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="modal-backdrop"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={sq ? active.nameSq : active.name}
          >
            <button
              className="modal-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="initial">{initials(sq ? active.nameSq : active.name)}</div>
            <h2>{sq ? active.nameSq : active.name}</h2>
            <p className="role">{sq ? active.titleSq : active.title}</p>

            <div className="modal-meta">
              {active.years && (
                <div>
                  <span className="k">{t.lived}</span>
                  <span className="v">{active.years}</span>
                </div>
              )}
              <div>
                <span className="k">{t.feastDay}</span>
                <span className="v">{sq ? active.feastSq : active.feast}</span>
              </div>
              <div>
                <span className="k">{t.patronOf}</span>
                <span className="v">{sq ? active.patronageSq : active.patronage}</span>
              </div>
            </div>

            <blockquote>&ldquo;{sq ? active.quoteSq : active.quote}&rdquo;</blockquote>
            <cite>&mdash; {sq ? active.quoteRefSq : active.quoteRef}</cite>

            <p className="bio">{sq ? active.bioSq : active.bio}</p>
          </div>
        </div>
      )}
    </>
  );
}
