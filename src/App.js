import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import { FaGithub } from "react-icons/fa";
import { Analytics } from '@vercel/analytics/react';
import PARAGRAPHS from "./data/paragraphs";
import DarkVeil from "./components/DarkVeil";

// ─── Session-based "no repeat" tracker ─────────────────────────────
const usedIndices = {
  easy: new Set(),
  medium: new Set(),
  hard: new Set(),
  code: new Set(),
};

function getRandomParagraph(difficulty) {
  const list = PARAGRAPHS[difficulty];
  if (!list || list.length === 0) return null;

  const used = usedIndices[difficulty];

  // Build list of available indices (not used yet)
  const available = [];

  for (let i = 0; i < list.length; i++) {
    if (!used.has(i)) available.push(i);
  }

  // If all have been used, reset and start fresh
  if (available.length === 0) {
    used.clear();

    // Now all indices are available
    for (let i = 0; i < list.length; i++) {
      available.push(i);
    }
  }

  // Pick a random available index
  const randIdx = available[Math.floor(Math.random() * available.length)];

  // Remember it for this session
  used.add(randIdx);

  return list[randIdx];
}

// ─── Updated performance rating ──────────────────────────────────────
function getPerformanceLabel(wpm, accuracy, timeTaken) {
  const MAX_WPM = 80;
  const TOTAL_TIME = 60; // seconds

  // Normalise each metric to a 0–100 scale
  const wpmScore = Math.min(wpm, MAX_WPM) / MAX_WPM * 100;
  const accScore = accuracy;
  const timeScore = Math.max(0, 100 - (timeTaken / TOTAL_TIME) * 100);

  // Composite score
  const composite = (wpmScore + accScore + timeScore) / 3;

  if (composite >= 80) return { label: "Expert", color: "#ff6b35" };
  if (composite >= 60) return { label: "Advanced", color: "#39ff14" };
  if (composite >= 40) return { label: "Intermediate", color: "#00d4ff" };
  if (composite >= 20) return { label: "Beginner", color: "#ffd700" };

  return { label: "Keep Practicing", color: "#a0a0a0" };
}

// ─── Timer ────────────────────────────────────────────────────────────
function Timer({ timeLeft, totalTime }) {
  const pct = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="timer-wrapper">
      <div className={`timer-display ${isUrgent ? "urgent" : ""}`}>
        <span className="timer-number">{timeLeft}</span>
        <span className="timer-label">seconds</span>
      </div>

      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${isUrgent ? "urgent" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Live Stats ───────────────────────────────────────────────────────
function LiveStats({
  wpm,
  accuracy,
  correctChars,
  totalTyped,
  onRestart
}) {
  return (
    <div className="live-stats">
      <div className="stat-pill">
        <span className="stat-val">{wpm}</span>
        <span className="stat-key">WPM</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">{accuracy}%</span>
        <span className="stat-key">ACC</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">{correctChars}</span>
        <span className="stat-key">Correct</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">{totalTyped}</span>
        <span className="stat-key">Typed</span>
      </div>

      <button className="reset-btn" onClick={onRestart}>
        ↻
      </button>
    </div>
  );
}

// ─── Welcome Lightbox ─────────────────────────────────────────────────
function WelcomeLightbox({ onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="lightbox-backdrop"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div className="lightbox">
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="lightbox-content">
          <h2 id="lightbox-title">
            Test your typing speed and accuracy with Type.Shift
          </h2>

          <p>
            The <span className="lightbox-green">free</span> online typing
            speed tester.
          </p>

          <p>
            Choose from different difficulty levels and measure your words
            per minute (WPM), accuracy, and typing performance.
          </p>

          <p>
            Practice with passages from books, scientific texts, and
            programming algorithms.
          </p>

          <p className="lightbox-red">
            No account is required to start a typing test.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Legal Lightbox ───────────────────────────────────────────────────
function LegalLightbox({ type, onClose }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const title = type === "privacy"
    ? "Privacy Policy"
    : "Terms of Use";

  const filePath = type === "privacy"
    ? "/legal/privacy.txt"
    : "/legal/usage.txt";

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(false);
    setContent("");

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }

        return response.text();
      })
      .then((text) => {
        if (!cancelled) {
          setContent(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filePath]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="lightbox-backdrop"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-lightbox-title"
    >
      <div className="lightbox legal-lightbox">
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="lightbox-content">
          <h2 id="legal-lightbox-title">
            {title}
          </h2>

          {isLoading && (
            <p className="legal-loading">
              Loading...
            </p>
          )}

          {error && (
            <p className="legal-error">
              Unable to load this document.
            </p>
          )}

          {!isLoading && !error && (
            <div className="legal-text">
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Typing Box ───────────────────────────────────────────────────────
function TypingBox({
  paragraph,
  userInput,
  onInput,
  isFinished,
  inputRef
}) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (userInput.length > 0) {
      boxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [userInput]);

  const renderText = () => {
    return paragraph.split("").map((char, i) => {
      let cls = "char-pending";

      if (i < userInput.length) {
        cls = userInput[i] === char
          ? "char-correct"
          : "char-wrong";
      } else if (i === userInput.length) {
        cls = "char-cursor";
      }

      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-box" ref={boxRef}>
      <div
        className="text-display"
        onClick={() => inputRef.current?.focus()}
      >
        {renderText()}
      </div>

      <textarea
        ref={inputRef}
        className="hidden-input"
        value={userInput}
        onChange={(e) => onInput(e.target.value)}
        disabled={isFinished}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Typing input area"
      />

      {!isFinished && (
        <p className="click-hint">
          ↑ Click the text above or just start typing
        </p>
      )}
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────
function Result({
  wpm,
  accuracy,
  timeTaken,
  source,
  image,
  onRestart
}) {
  const { label, color } = getPerformanceLabel(
    wpm,
    accuracy,
    timeTaken
  );

  return (
    <div className="result-screen">
      <div
        className="result-badge"
        style={{
          borderColor: color,
          color
        }}
      >
        {label}
      </div>

      <div className="result-grid">
        <div className="result-card">
          <span
            className="result-number"
            style={{ color: "#39ff14" }}
          >
            {wpm}
          </span>

          <span className="result-desc">
            Words Per Minute
          </span>
        </div>

        <div className="result-card">
          <span
            className="result-number"
            style={{ color: "#00d4ff" }}
          >
            {accuracy}%
          </span>

          <span className="result-desc">
            Accuracy
          </span>
        </div>

        <div className="result-card">
          <span
            className="result-number"
            style={{ color: "#ffd700" }}
          >
            {timeTaken}s
          </span>

          <span className="result-desc">
            Time Taken
          </span>
        </div>
      </div>

      <div className="result-source">
        <span className="source-label">
          Source:
        </span>

        <span className="source-text">
          {source}
        </span>
      </div>

      {image && (
        <div className="result-image">
          <img
            src={image}
            alt="Book cover"
          />
        </div>
      )}

      <button
        className="restart-btn"
        onClick={onRestart}
      >
        ↺ Try Again
      </button>
    </div>
  );
}

// ─── Matrix Rain Effect ───────────────────────────────────────────────
/*
MATRIX RAIN EFFECT
CREDITS ALL BELONG TO https://github.com/javascriptacademy-stash/digital-rain
*/
function startMatrix(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const context = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = window.innerHeight;

  const katakana =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";

  const latin = "AVANTHIKA";
  const nums = "0123456789";
  const alphabet = katakana + latin + nums;

  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const rainDrops = Array(Math.floor(columns)).fill(1);

  const draw = () => {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.fillStyle = "rgb(83, 169, 43)";
    context.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );

      context.fillText(
        text,
        i * fontSize,
        rainDrops[i] * fontSize
      );

      if (
        rainDrops[i] * fontSize > canvas.height &&
        Math.random() > 0.975
      ) {
        rainDrops[i] = 0;
      }

      rainDrops[i]++;
    }
  };

  return setInterval(draw, 30);
}

// ─── Main ─────────────────────────────────────────────────────────────
export default function App() {
  const TOTAL_TIME = 60;

  const [showLightbox, setShowLightbox] = useState(true);
  const [legalType, setLegalType] = useState(null);

  const [difficulty, setDifficulty] = useState("medium");

  const [paragraphData, setParagraphData] = useState(() =>
    getRandomParagraph("medium")
  );

  const paragraph = paragraphData.text;

  const [userInput, setUserInput] = useState("");

  /*
   * elapsedMs is deliberately separate from timeLeft.
   *
   * timeLeft is the user-facing countdown.
   * elapsedMs is the high-precision value used for WPM.
   *
   * This prevents WPM from being affected by the 1-second
   * resolution of the visible countdown.
   */
  const [elapsedMs, setElapsedMs] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Exact timestamp of the first keystroke.
  const startTimeRef = useRef(null);

  // Exact timestamp when the test finishes.
  const endTimeRef = useRef(null);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const wpmUpdateRef = useRef(null);

  // ─── Matrix result effect ──────────────────────────────────────────
  useEffect(() => {
    let rain;

    if (isFinished) {
      rain = startMatrix("matrix-bg");
    }

    return () => {
      clearInterval(rain);
    };
  }, [isFinished]);

  // ─── Character statistics ──────────────────────────────────────────
  const correctChars = userInput
    .split("")
    .filter((ch, i) => ch === paragraph[i])
    .length;

  const totalTyped = userInput.length;

  // ─── Accurate WPM calculation ──────────────────────────────────────
  /*
   * Standard WPM formula:
   *
   *     WPM = correct characters / 5 / elapsed minutes
   *
   * Using correct characters gives us NET WPM.
   *
   * performance.now() gives sub-millisecond timing precision
   * and is much more appropriate for measuring typing speed
   * than calculating elapsed time from the integer countdown.
   */
  const elapsedMinutes = elapsedMs / 60000;

  const wpm =
    elapsedMinutes > 0
      ? Math.round(
          (correctChars / 5) / elapsedMinutes
        )
      : 0;

  // ─── Accuracy calculation ──────────────────────────────────────────
  const accuracy =
    totalTyped > 0
      ? Math.round(
          (correctChars / totalTyped) * 100
        )
      : 100;

  // ─── Display time ──────────────────────────────────────────────────
  const timeTaken = Math.min(
    TOTAL_TIME,
    Math.round(elapsedMs / 1000)
  );

  const timeLeft = Math.max(
    0,
    TOTAL_TIME - Math.floor(elapsedMs / 1000)
  );

  // ─── High-precision timer ───────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      clearInterval(wpmUpdateRef.current);
      return;
    }

    /*
     * Update elapsed time frequently enough that live WPM
     * feels responsive without rendering on every animation frame.
     */
    const updateElapsed = () => {
      if (startTimeRef.current === null) return;

      const now = performance.now();
      const elapsed = now - startTimeRef.current;

      if (elapsed >= TOTAL_TIME * 1000) {
        setElapsedMs(TOTAL_TIME * 1000);

        endTimeRef.current = now;

        clearInterval(timerRef.current);
        clearInterval(wpmUpdateRef.current);

        setIsFinished(true);
        setIsRunning(false);

        return;
      }

      setElapsedMs(elapsed);
    };

    updateElapsed();

    timerRef.current = setInterval(
      updateElapsed,
      100
    );

    wpmUpdateRef.current = timerRef.current;

    return () => {
      clearInterval(timerRef.current);
      clearInterval(wpmUpdateRef.current);
    };
  }, [isRunning]);

  // ─── Auto-focus hidden textarea on mount ─────────────────────────────
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ─── Handle typing input ────────────────────────────────────────────
  const handleInput = useCallback(
    (val) => {
      if (isFinished) return;

      /*
       * Start timing from the exact moment of the first
       * actual input.
       */
      if (!isRunning && val.length > 0) {
        const now = performance.now();

        startTimeRef.current = now;
        endTimeRef.current = null;

        setElapsedMs(0);
        setIsRunning(true);
      }

      setUserInput(val);

      /*
       * Finish immediately when the entire passage has
       * been typed.
       */
      if (val.length >= paragraph.length) {
        const now = performance.now();

        if (startTimeRef.current !== null) {
          const exactElapsed = Math.min(
            TOTAL_TIME * 1000,
            now - startTimeRef.current
          );

          setElapsedMs(exactElapsed);
        }

        endTimeRef.current = now;

        clearInterval(timerRef.current);
        clearInterval(wpmUpdateRef.current);

        setIsFinished(true);
        setIsRunning(false);
      }
    },
    [isRunning, isFinished, paragraph]
  );

  // ─── Reset everything ───────────────────────────────────────────────
  const handleRestart = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(wpmUpdateRef.current);

    const newParagraph =
      getRandomParagraph(difficulty);

    setParagraphData(newParagraph);
    setUserInput("");

    setElapsedMs(0);

    setIsRunning(false);
    setIsFinished(false);

    startTimeRef.current = null;
    endTimeRef.current = null;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [difficulty]);

  // ─── Change difficulty and reset ────────────────────────────────────
  const handleDifficulty = (d) => {
    setDifficulty(d);

    clearInterval(timerRef.current);
    clearInterval(wpmUpdateRef.current);

    const newParagraph =
      getRandomParagraph(d);

    setParagraphData(newParagraph);
    setUserInput("");

    setElapsedMs(0);

    setIsRunning(false);
    setIsFinished(false);

    startTimeRef.current = null;
    endTimeRef.current = null;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // ─── Tab key = restart shortcut ─────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, [handleRestart]);

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <div
      className={`app ${
        isFinished
          ? "results-active"
          : "game-active"
      }`}
    >
      <div className="darkveil-background">
        <DarkVeil
          hueShift={253}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={3}
          scanlineFrequency={0.5}
          warpAmount={1.3}
          resolutionScale={1}
          lightMode={false}
        />
      </div>

      {showLightbox && (
        <WelcomeLightbox
          onClose={() =>
            setShowLightbox(false)
          }
        />
      )}

      {legalType && (
        <LegalLightbox
          type={legalType}
          onClose={() =>
            setLegalType(null)
          }
        />
      )}

      {isFinished && (
        <>
          <canvas
            id="matrix-bg"
            className="matrix-bg"
          />

          <div className="matrix-overlay" />
        </>
      )}

      <div
        className="scanlines"
        aria-hidden="true"
      />

      <header className="app-header">
        <div className="logo">
          <span className="logo-bracket">
            [
          </span>

          <span className="logo-type">
            Type
          </span>

          <span className="logo-dot">
            .
          </span>

          <span className="logo-shift">
            Shift
          </span>

          <span className="logo-bracket">
            ]
          </span>
        </div>

        <p className="tagline">
          There are no two words in the English
          language more harmful than "good job"
        </p>
      </header>

      <div className="controls">
        <div className="control-group">
          <span className="control-label">
            Difficulty:
          </span>

          {[
            "easy",
            "medium",
            "hard",
            "code"
          ].map((d) => (
            <button
              key={d}
              className={`ctrl-btn ${
                difficulty === d
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleDifficulty(d)
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <main className="test-area">
        {!isFinished ? (
          <>
            <Timer
              timeLeft={timeLeft}
              totalTime={TOTAL_TIME}
            />

            <LiveStats
              wpm={wpm}
              accuracy={accuracy}
              correctChars={correctChars}
              totalTyped={totalTyped}
              onRestart={handleRestart}
            />

            <TypingBox
              paragraph={paragraph}
              userInput={userInput}
              onInput={handleInput}
              isFinished={isFinished}
              inputRef={inputRef}
            />

            <p className="shortcut-hint">
              TAB → Restart
            </p>

            <div className="social-links">
              <a
                href="https://github.com/JunaidAhamed-7777/Type.Shift"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </>
        ) : (
          <Result
            wpm={wpm}
            accuracy={accuracy}
            timeTaken={timeTaken}
            source={paragraphData.source}
            image={paragraphData.image}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="app-footer">
        <div>
          With Love · For My Cheeku · By Junaid
        </div>

        <div className="legal-links">
          <button
            onClick={() =>
              setLegalType("privacy")
            }
          >
            Privacy Policy
          </button>

          <span>·</span>

          <button
            onClick={() =>
              setLegalType("terms")
            }
          >
            Terms of Use
          </button>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}