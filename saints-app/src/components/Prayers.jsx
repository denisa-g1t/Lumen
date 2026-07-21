import { useState } from "react";
import prayers from "../data/prayers.json";
import { STRINGS } from "../i18n";

export default function Prayers({ lang }) {
  const t = STRINGS[lang];
  const sq = lang === "sq";
  const [openId, setOpenId] = useState(prayers[0].id);

  return (
    <div className="prayers-list">
      {prayers.map((p) => {
        const isOpen = openId === p.id;
        return (
          <div key={p.id} className={`prayer-card ${isOpen ? "open" : ""}`}>
            <button
              className="prayer-header"
              onClick={() => setOpenId(isOpen ? null : p.id)}
              aria-expanded={isOpen}
            >
              <span>{sq ? p.titleSq : p.titleEn}</span>
              <span className="prayer-toggle">{isOpen ? "\u2212" : "+"}</span>
            </button>
            {isOpen && (
              <p className="prayer-text">{sq ? p.textSq : p.textEn}</p>
            )}
          </div>
        );
      })}
      <p className="bible-lang-note">{t.prayersNote}</p>
    </div>
  );
}
