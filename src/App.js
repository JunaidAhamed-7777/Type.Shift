import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import { FaGithub } from "react-icons/fa";
import { Analytics } from "@vercel/analytics/react";
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

  const available = [];

  for (let i = 0; i < list.length; i++) {
    if (!used.has(i)) available.push(i);
  }

  if (available.length === 0) {
    used.clear();

    for (let i = 0; i < list.length; i++) {
      available.push(i);
    }
  }

  const randIdx =
    available[Math.floor(Math.random() * available.length)];

  used.add(randIdx);

  return list[randIdx];
}

// ─── Performance rating ─────────────────────────────────────────────
function getPerformanceLabel(wpm, accuracy, timeTaken) {
  const MAX_WPM = 80;
  const TOTAL_TIME = 60;

  const wpmScore =
    (Math.min(wpm, MAX_WPM) / MAX_WPM) * 100;

  const accScore = accuracy;

  const timeScore = Math.max(
    0,
    100 - (timeTaken / TOTAL_TIME) * 100
  );

  const composite =
    (wpmScore + accScore + timeScore) / 3;

  if (composite >= 80) {
    return {
      label: "Expert",
      color: "#ff6b35",
    };
  }

  if (composite >= 60) {
    return {
      label: "Advanced",
      color: "#39ff14",
    };
  }

  if (composite >= 40) {
    return {
      label: "Intermediate",
      color: "#00d4ff",
    };
  }

  if (composite >= 20) {
    return {
      label: "Beginner",
      color: "#ffd700",
    };
  }

  return {
    label: "Keep Practicing",
    color: "#a0a0a0",
  };
}

// ─── Timer ──────────────────────────────────────────────────────────
function Timer({ timeLeft, totalTime }) {
  const pct = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="timer-wrapper">
      <div
        className={`timer-display ${
          isUrgent ? "urgent" : ""
        }`}
      >
        <span className="timer-number">
          {timeLeft}
        </span>

        <span className="timer-label">
          seconds
        </span>
      </div>

      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${
            isUrgent ? "urgent" : ""
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Live Stats ─────────────────────────────────────────────────────
function LiveStats({
  wpm,
  accuracy,
  correctChars,
  totalTyped,
  onRestart,
}) {
  return (
    <div className="live-stats">
      <div className="stat-pill">
        <span className="stat-val">{wpm}</span>
        <span className="stat-key">WPM</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">
          {accuracy}%
        </span>
        <span className="stat-key">ACC</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">
          {correctChars}
        </span>
        <span className="stat-key">Correct</span>
      </div>

      <div className="stat-pill">
        <span className="stat-val">
          {totalTyped}
        </span>
        <span className="stat-key">Typed</span>
      </div>

      <button
        className="reset-btn"
        onClick={onRestart}
      >
        ↻
      </button>
    </div>
  );
}

// ─── Welcome Lightbox ───────────────────────────────────────────────
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
            Test your typing speed and accuracy with
            Type.Shift
          </h2>

          <p>
            The{" "}
            <span className="lightbox-green">
              free
            </span>{" "}
            online typing speed tester.
          </p>

          <p>
            Choose from different difficulty levels
            and measure your words per minute (WPM),
            accuracy, and typing performance.
          </p>

          <p>
            Practice with passages from books,
            scientific texts, and programming
            algorithms.
          </p>

          <p className="lightbox-red">
            No account is required to start a typing
            test.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Legal Lightbox ─────────────────────────────────────────────────
function LegalLightbox({ type, onClose }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const title =
    type === "privacy"
      ? "Privacy Policy"
      : "Terms of Use";

  const filePath =
    type === "privacy"
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
          throw new Error(
            `Failed to load ${filePath}`
          );
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

// ─── Typing Box ─────────────────────────────────────────────────────
function TypingBox({
  paragraph,
  userInput,
  onInput,
  isFinished,
  inputRef,
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
        cls =
          userInput[i] === char
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
        onClick={() =>
          inputRef.current?.focus()
        }
      >
        {renderText()}
      </div>

      <textarea
        ref={inputRef}
        className="hidden-input"
        value={userInput}
        onChange={(e) =>
          onInput(e.target.value)
        }
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

// ─── Result Screen ──────────────────────────────────────────────────
function Result({
  wpm,
  accuracy,
  timeTaken,
  source,
  image,
  onRestart,
}) {
  const { label, color } =
    getPerformanceLabel(
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
          color,
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

// ─── Matrix Rain Effect ─────────────────────────────────────────────
/*
MATRIX RAIN EFFECT
CREDITS ALL BELONG TO https://github.com/javascriptacademy-stash/digital-rain
*/
function startMatrix(canvasId) {
  const canvas =
    document.getElementById(canvasId);

  if (!canvas) return;

  const context = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = window.innerHeight;

  const katakana =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";

  const latin = "AVANTHIKA";
  const nums = "0123456789";
  const alphabet =
    katakana + latin + nums;

  const fontSize = 16;
  const columns =
    canvas.width / fontSize;

  const rainDrops = Array(
    Math.floor(columns)
  ).fill(1);

  const draw = () => {
    context.fillStyle =
      "rgba(0, 0, 0, 0.05)";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.fillStyle =
      "rgb(83, 169, 43)";

    context.font =
      fontSize + "px monospace";

    for (
      let i = 0;
      i < rainDrops.length;
      i++
    ) {
      const text =
        alphabet.charAt(
          Math.floor(
            Math.random() *
              alphabet.length
          )
        );

      context.fillText(
        text,
        i * fontSize,
        rainDrops[i] * fontSize
      );

      if (
        rainDrops[i] * fontSize >
          canvas.height &&
        Math.random() > 0.975
      ) {
        rainDrops[i] = 0;
      }

      rainDrops[i]++;
    }
  };

  return setInterval(draw, 30);
}

// ─── Main ───────────────────────────────────────────────────────────
export default function App() {
  const TOTAL_TIME = 60;

  /*
   * WPM stabilization window.
   *
   * During the first few seconds, calculating WPM from
   * the entire elapsed time produces mathematically correct
   * but visually useless spikes because the denominator is
   * extremely small.
   *
   * We therefore blend the real elapsed-time WPM with a
   * short rolling typing-speed measurement during the
   * startup period.
   */
  const WPM_STABILIZATION_TIME = 3000;

  const [showLightbox, setShowLightbox] =
    useState(true);

  const [legalType, setLegalType] =
    useState(null);

  const [difficulty, setDifficulty] =
    useState("medium");

  const [paragraphData, setParagraphData] =
    useState(() =>
      getRandomParagraph("medium")
    );

  const paragraph = paragraphData.text;

  const [userInput, setUserInput] =
    useState("");

  /*
   * elapsedMs is the exact elapsed test time.
   *
   * It is intentionally separate from timeLeft because
   * timeLeft is only a user-facing whole-second countdown.
   */
  const [elapsedMs, setElapsedMs] =
    useState(0);

  /*
   * Tracks the WPM value shown on screen.
   *
   * Keeping this separate from elapsedMs allows the display
   * to remain stable between timer updates and prevents
   * React render timing from influencing the calculation.
   */
  const [displayWpm, setDisplayWpm] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isFinished, setIsFinished] =
    useState(false);

  // Exact timestamp of the first keystroke.
  const startTimeRef = useRef(null);

  // Exact timestamp when the test finishes.
  const endTimeRef = useRef(null);

  /*
   * Stores recent typing samples.
   *
   * Each sample contains:
   * - timestamp
   * - correct character count
   *
   * These samples allow the live WPM to be calculated from
   * the user's recent typing pace instead of dividing by an
   * extremely small total elapsed time.
   */
  const wpmSamplesRef = useRef([]);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const wpmUpdateRef = useRef(null);

  // ─── Matrix result effect ─────────────────────────────────────────
  useEffect(() => {
    let rain;

    if (isFinished) {
      rain = startMatrix("matrix-bg");
    }

    return () => {
      clearInterval(rain);
    };
  }, [isFinished]);

  // ─── Character statistics ─────────────────────────────────────────
  const correctChars = userInput
    .split("")
    .filter(
      (ch, i) => ch === paragraph[i]
    ).length;

  const totalTyped = userInput.length;

  // ─── Accuracy calculation ─────────────────────────────────────────
  const accuracy =
    totalTyped > 0
      ? Math.round(
          (correctChars / totalTyped) *
            100
        )
      : 100;

  // ─── Live WPM calculation ─────────────────────────────────────────
  /*
   * Calculate WPM using a recent rolling window.
   *
   * The rolling window prevents the first few keystrokes
   * from dominating the displayed speed.
   *
   * Once enough time has elapsed, WPM transitions to the
   * normal full-test calculation.
   */
  const calculateLiveWpm = useCallback(
    (correctCount, elapsed) => {
      if (
        !startTimeRef.current ||
        elapsed <= 0 ||
        correctCount <= 0
      ) {
        return 0;
      }

      const elapsedSeconds =
        elapsed / 1000;

      /*
       * For the first 3 seconds, use a rolling window
       * whose minimum duration is 1 second.
       *
       * This prevents values such as:
       *
       * 10 chars / 0.1 seconds = 1200 WPM
       *
       * while still responding quickly to actual typing.
       */
      if (
        elapsedSeconds <
        WPM_STABILIZATION_TIME / 1000
      ) {
        const now =
          performance.now();

        const samples =
          wpmSamplesRef.current;

        /*
         * Keep only samples from the most recent
         * stabilization window.
         */
        const windowStart =
          now -
          WPM_STABILIZATION_TIME;

        while (
          samples.length > 0 &&
          samples[0].time < windowStart
        ) {
          samples.shift();
        }

        /*
         * We need a meaningful time interval before
         * calculating rolling WPM.
         */
        if (samples.length < 2) {
          return 0;
        }

        const first =
          samples[0];

        const last =
          samples[samples.length - 1];

        const windowMs =
          last.time - first.time;

        /*
         * Never calculate a speed over an interval
         * smaller than 1 second.
         */
        const effectiveWindowMs =
          Math.max(windowMs, 1000);

        const charsTyped =
          Math.max(
            0,
            last.correctChars -
              first.correctChars
          );

        /*
         * If the sample interval is shorter than one
         * second, include the current cumulative progress
         * while using the minimum one-second denominator.
         */
        const effectiveChars =
          windowMs < 1000
            ? last.correctChars
            : charsTyped;

        const minutes =
          effectiveWindowMs / 60000;

        return Math.round(
          (effectiveChars / 5) /
            minutes
        );
      }

      /*
       * After the startup period, use the standard
       * full-test NET WPM calculation.
       */
      const elapsedMinutes =
        elapsed / 60000;

      return Math.round(
        (correctCount / 5) /
          elapsedMinutes
      );
    },
    []
  );

  // ─── Display WPM ──────────────────────────────────────────────────
  /*
   * The actual WPM used by the result screen is always the
   * exact full-test calculation.
   *
   * displayWpm is only the live value shown while typing.
   */
  const finalWpm =
    elapsedMs > 0
      ? Math.round(
          (correctChars / 5) /
            (elapsedMs / 60000)
        )
      : 0;

  const wpm = isFinished
    ? finalWpm
    : displayWpm;

  // ─── Display time ─────────────────────────────────────────────────
  const timeTaken = Math.min(
    TOTAL_TIME,
    Math.round(elapsedMs / 1000)
  );

  const timeLeft = Math.max(
    0,
    TOTAL_TIME -
      Math.floor(elapsedMs / 1000)
  );

  // ─── High-precision timer ─────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      clearInterval(wpmUpdateRef.current);
      return;
    }

    const updateElapsed = () => {
      if (startTimeRef.current === null) {
        return;
      }

      const now =
        performance.now();

      const elapsed =
        now -
        startTimeRef.current;

      if (
        elapsed >=
        TOTAL_TIME * 1000
      ) {
        const exactElapsed =
          TOTAL_TIME * 1000;

        setElapsedMs(
          exactElapsed
        );

        /*
         * At the end of the test, always use the
         * exact final WPM instead of the stabilized
         * live value.
         */
        const finalElapsedMinutes =
          exactElapsed / 60000;

        const finalCorrectChars =
          userInput
            .split("")
            .filter(
              (ch, i) =>
                ch === paragraph[i]
            ).length;

        const finalWpm =
          finalElapsedMinutes > 0
            ? Math.round(
                (finalCorrectChars / 5) /
                  finalElapsedMinutes
              )
            : 0;

        setDisplayWpm(
          finalWpm
        );

        endTimeRef.current =
          now;

        clearInterval(
          timerRef.current
        );

        clearInterval(
          wpmUpdateRef.current
        );

        setIsFinished(true);
        setIsRunning(false);

        return;
      }

      setElapsedMs(elapsed);

      const currentCorrectChars =
        userInput
          .split("")
          .filter(
            (ch, i) =>
              ch === paragraph[i]
          ).length;

      const liveWpm =
        calculateLiveWpm(
          currentCorrectChars,
          elapsed
        );

      setDisplayWpm(
        liveWpm
      );
    };

    updateElapsed();

    timerRef.current =
      setInterval(
        updateElapsed,
        100
      );

    wpmUpdateRef.current =
      timerRef.current;

    return () => {
      clearInterval(
        timerRef.current
      );

      clearInterval(
        wpmUpdateRef.current
      );
    };
  }, [
    isRunning,
    calculateLiveWpm,
    paragraph,
    userInput,
  ]);

  // ─── Auto-focus hidden textarea ───────────────────────────────────
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ─── Handle typing input ───────────────────────────────────────────
  const handleInput =
    useCallback(
      (val) => {
        if (isFinished) return;

        /*
         * Start timing exactly when the first character
         * is entered.
         */
        if (
          !isRunning &&
          val.length > 0
        ) {
          const now =
            performance.now();

          startTimeRef.current =
            now;

          endTimeRef.current =
            null;

          wpmSamplesRef.current =
            [
              {
                time: now,
                correctChars: 0,
              },
            ];

          setElapsedMs(0);
          setDisplayWpm(0);
          setIsRunning(true);
        }

        /*
         * Calculate the number of correct characters
         * for the new input value.
         */
        const newCorrectChars =
          val
            .split("")
            .filter(
              (ch, i) =>
                ch === paragraph[i]
            ).length;

        /*
         * Record a sample immediately on every input.
         *
         * These samples are used only for the live
         * stabilized WPM calculation.
         */
        if (
          startTimeRef.current !==
            null &&
          val.length > 0
        ) {
          wpmSamplesRef.current.push(
            {
              time:
                performance.now(),
              correctChars:
                newCorrectChars,
            }
          );
        }

        setUserInput(val);

        /*
         * Finish immediately when the complete
         * passage has been typed.
         */
        if (
          val.length >=
          paragraph.length
        ) {
          const now =
            performance.now();

          if (
            startTimeRef.current !==
            null
          ) {
            const exactElapsed =
              Math.min(
                TOTAL_TIME * 1000,
                now -
                  startTimeRef.current
              );

            setElapsedMs(
              exactElapsed
            );

            /*
             * The final result is never based on
             * the rolling WPM. It uses the exact
             * elapsed duration of the entire test.
             */
            const elapsedMinutes =
              exactElapsed /
              60000;

            const exactFinalWpm =
              elapsedMinutes > 0
                ? Math.round(
                    (newCorrectChars / 5) /
                      elapsedMinutes
                  )
                : 0;

            setDisplayWpm(
              exactFinalWpm
            );
          }

          endTimeRef.current =
            now;

          clearInterval(
            timerRef.current
          );

          clearInterval(
            wpmUpdateRef.current
          );

          setIsFinished(true);
          setIsRunning(false);
        }
      },
      [
        isRunning,
        isFinished,
        paragraph,
      ]
    );

  // ─── Reset everything ──────────────────────────────────────────────
  const handleRestart =
    useCallback(() => {
      clearInterval(
        timerRef.current
      );

      clearInterval(
        wpmUpdateRef.current
      );

      const newParagraph =
        getRandomParagraph(
          difficulty
        );

      setParagraphData(
        newParagraph
      );

      setUserInput("");

      setElapsedMs(0);

      setDisplayWpm(0);

      setIsRunning(false);
      setIsFinished(false);

      startTimeRef.current =
        null;

      endTimeRef.current =
        null;

      wpmSamplesRef.current =
        [];

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }, [difficulty]);

  // ─── Change difficulty and reset ───────────────────────────────────
  const handleDifficulty = (d) => {
    setDifficulty(d);

    clearInterval(
      timerRef.current
    );

    clearInterval(
      wpmUpdateRef.current
    );

    const newParagraph =
      getRandomParagraph(d);

    setParagraphData(
      newParagraph
    );

    setUserInput("");

    setElapsedMs(0);

    setDisplayWpm(0);

    setIsRunning(false);
    setIsFinished(false);

    startTimeRef.current =
      null;

    endTimeRef.current =
      null;

    wpmSamplesRef.current =
      [];

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // ─── Tab key = restart shortcut ───────────────────────────────────
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

  // ─── Render ────────────────────────────────────────────────────────
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
            "code",
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
              correctChars={
                correctChars
              }
              totalTyped={totalTyped}
              onRestart={
                handleRestart
              }
            />

            <TypingBox
              paragraph={paragraph}
              userInput={userInput}
              onInput={handleInput}
              isFinished={
                isFinished
              }
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
            source={
              paragraphData.source
            }
            image={
              paragraphData.image
            }
            onRestart={
              handleRestart
            }
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
              setLegalType(
                "privacy"
              )
            }
          >
            Privacy Policy
          </button>

          <span>·</span>

          <button
            onClick={() =>
              setLegalType(
                "terms"
              )
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
