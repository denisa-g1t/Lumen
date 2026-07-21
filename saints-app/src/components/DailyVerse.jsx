import verses from "../data/verses.json";
import { STRINGS } from "../i18n";

// Pick a verse deterministically per day, so everyone sees the same
// "word for today" and it changes automatically at midnight.
function verseOfTheDay() {
  const start = new Date(2026, 0, 1).getTime();
  const daysSince = Math.floor((Date.now() - start) / 86400000);
  const index = ((daysSince % verses.length) + verses.length) % verses.length;
  return verses[index];
}

export default function DailyVerse({ lang }) {
  const t = STRINGS[lang];
  const verse = verseOfTheDay();
  const text = lang === "sq" ? verse.sq : verse.en;
  const ref = lang === "sq" ? verse.refSq : verse.ref;
  const first = text.charAt(0);
  const rest = text.slice(1);

  return (
    <section className="hero">
      <span className="hero-eyebrow">{t.verseEyebrow}</span>
      <p className="hero-verse">
        <span className="capital">{first}</span>
        {rest}
      </p>
      <p className="hero-ref">{ref} &mdash; {t.verseAttribution}</p>
      <p className="hero-note">{t.heroNote}</p>
    </section>
  );
}
