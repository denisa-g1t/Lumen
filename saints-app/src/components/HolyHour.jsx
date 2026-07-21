import { useEffect, useRef, useState } from "react";
import { STRINGS } from "../i18n";

const STORAGE_KEY = "lumen.holyhour.v1";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayKey()) return null; // reset each new day
    return parsed;
  } catch {
    return null;
  }
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function HolyHour({ lang }) {
  const t = STRINGS[lang];
  const initial = loadState();
  const [goalMinutes, setGoalMinutes] = useState(initial?.goalMinutes ?? 60);
  const [seconds, setSeconds] = useState(initial?.seconds ?? 0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: todayKey(), goalMinutes, seconds })
    );
  }, [goalMinutes, seconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const goalSeconds = goalMinutes * 60;
  const progress = Math.min(1, seconds / goalSeconds);
  const reached = progress >= 1;

  // wax height shrinks from 100 down to 20 as progress goes 0 -> 1
  const waxHeight = 100 - progress * 78;
  const waxY = 150 - waxHeight;

  return (
    <div className="candle-card">
      <div className="candle-wrap">
        <svg viewBox="0 0 120 180" width="100%" height="100%" role="img" aria-label="A votive candle representing your holy hour">
          <rect x="30" y="150" width="60" height="14" rx="3" fill="#3A2F1F" />
          <rect
            x="38"
            y={waxY}
            width="44"
            height={waxHeight}
            rx="4"
            fill="#EADFC2"
          />
          <rect x="57" y={waxY - 14} width="6" height="14" fill="#C9BC9C" />
          <g className="flame">
            <path
              d={`M60 ${waxY - 44} C 68 ${waxY - 30}, 72 ${waxY - 16}, 60 ${waxY - 6} C 48 ${waxY - 16}, 52 ${waxY - 30}, 60 ${waxY - 44} Z`}
              fill={reached ? "#E4C459" : "#C9A227"}
            />
            <path
              d={`M60 ${waxY - 30} C 64 ${waxY - 22}, 65 ${waxY - 14}, 60 ${waxY - 8} C 55 ${waxY - 14}, 56 ${waxY - 22}, 60 ${waxY - 30} Z`}
              fill="#F3E7CE"
            />
          </g>
        </svg>
      </div>

      <div className="candle-info">
        <span className="label">{t.holyHourLabel}</span>
        <div className="candle-time">{formatTime(seconds)}</div>
        <p className="candle-goal">
          {reached ? t.holyHourGoalReached(goalMinutes) : t.holyHourGoal(goalMinutes)}
        </p>

        <div className="candle-controls">
          {!running ? (
            <button className="btn btn-primary" onClick={() => setRunning(true)}>
              {seconds === 0 ? t.begin : t.resume}
            </button>
          ) : (
            <button className="btn" onClick={() => setRunning(false)}>
              {t.pause}
            </button>
          )}
          <button
            className="btn btn-ghost"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            {t.reset}
          </button>
        </div>

        <div className="candle-slider">
          <span>{t.dailyGoal}</span>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={goalMinutes}
            onChange={(e) => setGoalMinutes(Number(e.target.value))}
            aria-label="Daily holy hour goal in minutes"
          />
          <span>{goalMinutes} {t.minShort}</span>
        </div>
      </div>
    </div>
  );
}
