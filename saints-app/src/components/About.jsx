import { STRINGS } from "../i18n";

export default function About({ lang }) {
  const t = STRINGS[lang];
  const sq = lang === "sq";

  return (
    <div className="about-card">
      <span className="hero-eyebrow">{t.aboutEyebrow}</span>
      <blockquote className="about-quote">
        {sq ? (
          <>
            "E gjeta Perëndinë nëpërmjet teknologjisë, dhe Ai më çoi te Kisha
            e Tij dhe te populli i Tij. Ai më zgjodhi, dhe unë jam kaq e
            padenjë për t'ia kthyer, por gjithçka që bëj është sepse e dua
            Atë, sepse Ai nuk do të na lërë kurrë. Perëndia është brenda
            nesh."
          </>
        ) : (
          <>
            "I found God through technology, and He led me to His Church and
            to His people. He chose me, and I am so unworthy to pay Him back
            &mdash; but everything I do is because I love Him, because He
            will never leave us. God is within us."
          </>
        )}
      </blockquote>
      <cite>&mdash; {t.aboutSignature}</cite>

      <p className="about-note">{t.aboutNote}</p>
    </div>
  );
}
