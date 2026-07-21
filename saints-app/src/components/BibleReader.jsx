import { useEffect, useMemo, useState } from "react";
import books from "../data/bible-books.json";
import { STRINGS } from "../i18n";

const cache = new Map();

export default function BibleReader({ lang }) {
  const t = STRINGS[lang];
  const sq = lang === "sq";

  const [testament, setTestament] = useState("NT");
  const [bookFile, setBookFile] = useState("John.json");
  const [chapterIdx, setChapterIdx] = useState(0);
  const [bookData, setBookData] = useState(null);
  const [status, setStatus] = useState("loading");

  const visibleBooks = useMemo(
    () => books.filter((b) => b.testament === testament),
    [testament]
  );

  const currentBookMeta = books.find((b) => b.file === bookFile);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    if (cache.has(bookFile)) {
      setBookData(cache.get(bookFile));
      setStatus("ready");
      return;
    }

    fetch(`/bible/kjv/${bookFile}`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        cache.set(bookFile, data);
        setBookData(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [bookFile]);

  function selectBook(file) {
    setBookFile(file);
    setChapterIdx(0);
  }

  const chapter = bookData?.chapters?.[chapterIdx];
  const chapterCount = bookData?.chapters?.length ?? 0;

  return (
    <div className="bible-reader">
      <div className="bible-sidebar">
        <div className="task-tabs">
          <button
            className={`chip ${testament === "OT" ? "active" : ""}`}
            onClick={() => setTestament("OT")}
          >
            {t.oldTestament}
          </button>
          <button
            className={`chip ${testament === "NT" ? "active" : ""}`}
            onClick={() => setTestament("NT")}
          >
            {t.newTestament}
          </button>
        </div>
        <ul className="bible-book-list">
          {visibleBooks.map((b) => (
            <li key={b.file}>
              <button
                className={bookFile === b.file ? "active" : ""}
                onClick={() => selectBook(b.file)}
              >
                {sq ? b.sq : b.en}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bible-content">
        <div className="bible-content-header">
          <h3>{sq ? currentBookMeta?.sq : currentBookMeta?.en}</h3>
          {chapterCount > 0 && (
            <div className="bible-chapter-nav">
              <button
                className="btn btn-ghost"
                disabled={chapterIdx === 0}
                onClick={() => setChapterIdx((i) => Math.max(0, i - 1))}
              >
                &larr;
              </button>
              <select
                value={chapterIdx}
                onChange={(e) => setChapterIdx(Number(e.target.value))}
                aria-label={t.chapter}
              >
                {bookData.chapters.map((c, i) => (
                  <option key={c.chapter} value={i}>
                    {t.chapter} {c.chapter}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-ghost"
                disabled={chapterIdx >= chapterCount - 1}
                onClick={() =>
                  setChapterIdx((i) => Math.min(chapterCount - 1, i + 1))
                }
              >
                &rarr;
              </button>
            </div>
          )}
        </div>

        {status === "loading" && <p className="bible-status">{t.loading}</p>}
        {status === "error" && <p className="bible-status">{t.loadError}</p>}

        {status === "ready" && chapter && (
          <div className="bible-verses">
            {chapter.verses.map((v) => (
              <p key={v.verse} className="bible-verse">
                <span className="bible-verse-num">{v.verse}</span>
                {v.text}
              </p>
            ))}
          </div>
        )}

        <p className="bible-lang-note">{t.bibleLangNote}</p>
      </div>
    </div>
  );
}
