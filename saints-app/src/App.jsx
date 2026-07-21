import { useState } from "react";
import DailyVerse from "./components/DailyVerse";
import HolyHour from "./components/HolyHour";
import TaskManager from "./components/TaskManager";
import Saints from "./components/Saints";
import { STRINGS } from "./i18n";

const LANG_KEY = "lumen.lang.v1";

function loadLang() {
  try {
    return localStorage.getItem(LANG_KEY) || "sq";
  } catch {
    return "sq";
  }
}

export default function App() {
  const [tab, setTab] = useState("today");
  const [lang, setLang] = useState(loadLang);
  const t = STRINGS[lang];

  function changeLang(next) {
    setLang(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore storage errors */
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <path fill="#C9A227" d="M32 4c4 10-6 14-6 24a10 10 0 0 0 20 0c0-6-3-9-3-9s5 6 5 15a18 18 0 0 1-36 0C12 18 26 16 32 4Z" />
          </svg>
          <span>
            Lumen
            <span className="brand-sub">{t.brandSub}</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <nav className="tabs">
            <button
              className={tab === "today" ? "active" : ""}
              onClick={() => setTab("today")}
            >
              {t.tabToday}
            </button>
            <button
              className={tab === "saints" ? "active" : ""}
              onClick={() => setTab("saints")}
            >
              {t.tabSaints}
            </button>
          </nav>

          <nav className="tabs" aria-label="Language">
            <button
              className={lang === "sq" ? "active" : ""}
              onClick={() => changeLang("sq")}
            >
              Shqip
            </button>
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => changeLang("en")}
            >
              EN
            </button>
          </nav>
        </div>
      </header>

      <main className="app-shell">
        {tab === "today" && (
          <>
            <DailyVerse lang={lang} />

            <div className="section-heading">
              <h2>{t.holyHourHeading}</h2>
              <p>{t.holyHourSub}</p>
            </div>
            <HolyHour lang={lang} />

            <div className="section-heading">
              <h2>{t.tasksHeading}</h2>
              <p>{t.tasksSub}</p>
            </div>
            <TaskManager lang={lang} />
          </>
        )}

        {tab === "saints" && (
          <>
            <div className="section-heading">
              <h2>{t.saintsHeading}</h2>
              <p>{t.saintsSub}</p>
            </div>
            <Saints lang={lang} />
          </>
        )}

        <footer className="site-footer">
          <strong>{t.footerQuote}</strong>
          <br />
          {t.footerRef}
        </footer>
      </main>
    </>
  );
}
