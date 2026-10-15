import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import { FaGithub, FaGlobe } from "react-icons/fa";
import { FiArrowUpRight, FiArrowRight, FiRotateCcw, FiSun, FiMoon, FiX, FiCornerDownLeft, FiClock, FiCode, FiBookOpen, FiCheck, FiArrowUp } from "react-icons/fi";
import { Analytics } from "@vercel/analytics/react";
import PARAGRAPHS from "./data/paragraphs";

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
function getPerformanceLabel(wpm, accuracy) {
  if (accuracy < 80) return { label: "Build your accuracy", color: "var(--accent)" };
  if (wpm >= 80 && accuracy >= 95) return { label: "Beautifully done", color: "var(--success)" };
  if (wpm >= 50 && accuracy >= 90) return { label: "Finding your flow", color: "var(--success)" };
  return { label: "Every session counts", color: "var(--accent)" };
}

// ─── Timer ──────────────────────────────────────────────────────────
function Timer({ timeLeft, totalTime }) {
  return (
    <div className={`timer-wrapper ${timeLeft <= 10 ? "urgent" : ""}`}>
      <FiClock aria-hidden="true" />
      <span className="timer-number">{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</span>
      <span className="sr-only">remaining of {totalTime} seconds</span>
    </div>
  );
}

// ─── Live Stats ─────────────────────────────────────────────────────
function LiveStats({ wpm, accuracy, correctChars, totalTyped }) {
  return (
    <dl className="live-stats" aria-label="Live typing statistics">
      <div className="stat"><dt>Words / min</dt><dd>{wpm}<span>wpm</span></dd></div>
      <div className="stat"><dt>Accuracy</dt><dd>{totalTyped ? accuracy : "—"}<span>{totalTyped ? "%" : ""}</span></dd></div>
      <div className="stat"><dt>Correct characters</dt><dd>{correctChars}<span>/ {totalTyped}</span></dd></div>
    </dl>
  );
}

function AppearanceToggle() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("typeshift-theme") === "dark"; }
    catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem("typeshift-theme", dark ? "dark" : "light"); } catch { /* Theme still works when storage is unavailable. */ }
  }, [dark]);
  return <button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} title={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? <FiSun /> : <FiMoon />}</button>;
}

function Dialog({ title, children, onClose, className = "" }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={dialogRef} className={`lightbox ${className}`} aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) onClose();
    }}>
      <div className="dialog-header"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog" autoFocus><FiX /></button></div>
      <div className="lightbox-content">{children}</div>
    </dialog>
  );
}

// ─── Welcome Lightbox ───────────────────────────────────────────────
function WelcomeLightbox({ onClose }) {
  return (
    <Dialog title="A little practice goes a long way." onClose={onClose}>
      <p>Type.Shift is a free place to practice with passages from books, science, and code. No account required.</p>
      <ol className="how-to-list">
        <li><strong>Make it yours.</strong><span>Choose a difficulty and a time limit. Each new test brings a different passage.</span></li>
        <li><strong>Start with one keystroke.</strong><span>Click or tap the passage, then type what you see. The clock starts with your first character.</span></li>
        <li><strong>Find your flow.</strong><span>Use Backspace to correct mistakes. Your test ends at the time limit or the end of the passage.</span></li>
      </ol>
      <p>Speed is correct characters divided by five, per minute. Accuracy measures how much of your final text matches the passage.</p>
      <div className="dialog-shortcuts"><span><kbd>Tab</kbd> New passage while typing</span><span><kbd>Esc</kbd> Leave the typing area</span></div>
      <button className="primary-button" onClick={onClose}>Let's type <FiArrowRight aria-hidden="true" /></button>
    </Dialog>
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

  return (
    <Dialog title={title} onClose={onClose} className="legal-lightbox">
      {isLoading && <p className="legal-loading" role="status">Loading document…</p>}
      {error && <p className="legal-error" role="alert">This document could not be loaded. <a href={filePath} target="_blank" rel="noopener noreferrer">Open the document directly</a> or try again when you're connected.</p>}
      {!isLoading && !error && <div className="legal-text">{content}</div>}
    </Dialog>
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

  /*
   * Mobile browsers and in-app WebViews do not all handle the
   * virtual keyboard the same way.
   *
   * The important distinction here is:
   *
   * 1. When the keyboard opens, move the typing box into view.
   * 2. After that, DO NOT keep forcing the page position while
   *    the user manually scrolls.
   *
   * This prevents the input from becoming effectively "locked"
   * to one position on the screen.
   */
  const keepTypingBoxVisible = useCallback(() => {
    const box = boxRef.current;

    if (!box || !inputRef.current) return;
    if (document.activeElement !== inputRef.current) return;

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

    if (!isMobile) return;

    const viewport = window.visualViewport;

    /*
     * First allow the browser to perform its native
     * keyboard-avoidance behavior.
     *
     * This is especially useful inside WebViews.
     */
    box.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "nearest",
    });

    if (!viewport) return;

    const visibleTop =
      viewport.offsetTop + 16;

    const visibleBottom =
      viewport.offsetTop +
      viewport.height -
      24;

    const boxRect =
      box.getBoundingClientRect();

    /*
     * Only correct the position when the box is actually
     * hidden behind the keyboard.
     */
    if (boxRect.bottom > visibleBottom) {
      window.scrollBy({
        top:
          boxRect.bottom -
          visibleBottom,
        behavior: "auto",
      });

      return;
    }

    /*
     * Recover if a WebView initially pans the page too far
     * upward during keyboard opening.
     */
    if (boxRect.top < visibleTop) {
      window.scrollBy({
        top:
          boxRect.top -
          visibleTop,
        behavior: "auto",
      });
    }
  }, [inputRef]);

  /*
   * The keyboard often appears slightly after the focus event.
   * Run the initial positioning several times so that Chromium
   * and embedded WebViews have time to finish their keyboard
   * transition.
   *
   * IMPORTANT:
   * These checks happen only around focus.
   * They do NOT run continuously while the user scrolls.
   */
  const handleInputFocus = useCallback(() => {
    const delays = [0, 100, 300, 600];

    const timers = delays.map((delay) =>
      setTimeout(
        keepTypingBoxVisible,
        delay
      )
    );

    return () => {
      timers.forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, [keepTypingBoxVisible]);

  /*
   * Keep the typing box visible after text changes, but only
   * while the keyboard is likely settling into position.
   *
   * This is intentionally NOT coupled to scroll events.
   */
  useEffect(() => {
    if (!userInput.length) return;

    const frame =
      requestAnimationFrame(() => {
        keepTypingBoxVisible();
      });

    return () =>
      cancelAnimationFrame(frame);
  }, [
    userInput,
    keepTypingBoxVisible,
  ]);

  /*
   * Listen for viewport resizing caused by the virtual keyboard.
   *
   * We intentionally do NOT listen for:
   * - visualViewport "scroll"
   * - window "scroll"
   *
   * Those events can also be triggered by the user manually
   * scrolling the page. Listening to them would immediately
   * undo the user's scroll position.
   */
  useEffect(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

    if (!isMobile) return;

    const viewport =
      window.visualViewport;

    let settleTimer = null;

    const handleViewportResize = () => {
      if (
        document.activeElement !==
        inputRef.current
      ) {
        return;
      }

      /*
       * Give the WebView a moment to finish updating its
       * visual viewport before correcting the typing box.
       */
      if (settleTimer) {
        clearTimeout(settleTimer);
      }

      settleTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          keepTypingBoxVisible();
        });
      }, 50);
    };

    if (viewport) {
      viewport.addEventListener(
        "resize",
        handleViewportResize
      );
    }

    window.addEventListener(
      "resize",
      handleViewportResize
    );

    return () => {
      if (settleTimer) {
        clearTimeout(settleTimer);
      }

      if (viewport) {
        viewport.removeEventListener(
          "resize",
          handleViewportResize
        );
      }

      window.removeEventListener(
        "resize",
        handleViewportResize
      );
    };
  }, [
    inputRef,
    keepTypingBoxVisible,
  ]);

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
        onFocus={handleInputFocus}
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
CREDITS ALL BELONG TO:
https://github.com/javascriptacademy-stash/digital-rain
*/
function startMatrix(canvasId) {
  const canvas =
    document.getElementById(canvasId);

  if (!canvas) return;

  const context =
    canvas.getContext("2d");

  canvas.width =
    canvas.offsetWidth;

  canvas.height =
    window.innerHeight;

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

  return setInterval(
    draw,
    30
  );
}

// ─── Main ───────────────────────────────────────────────────────────
export default function App() {
  const [totalTime, setTotalTime] = useState(60);

  /*
   * During the first few seconds, using the entire elapsed
   * duration produces extreme values because the denominator
   * starts extremely small.
   *
   * A 3-second rolling startup window keeps the live value
   * meaningful while the final result still uses exact timing.
   */
  const WPM_STABILIZATION_TIME =
    3000;

  const [showLightbox, setShowLightbox] =
    useState(false);

  const [legalType, setLegalType] =
    useState(null);

  const [difficulty, setDifficulty] =
    useState("medium");

  const [paragraphData, setParagraphData] =
    useState(() =>
      getRandomParagraph("medium")
    );

  const paragraph =
    paragraphData.text;

  const [userInput, setUserInput] =
    useState("");

  /*
   * Exact elapsed test time.
   *
   * This is separate from timeLeft because the visible
   * countdown only needs whole-second precision.
   */
  const [elapsedMs, setElapsedMs] =
    useState(0);

  /*
   * WPM value currently displayed in the live statistics.
   */
  const [displayWpm, setDisplayWpm] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isFinished, setIsFinished] =
    useState(false);

  // Exact timestamp of the first keystroke.
  const startTimeRef =
    useRef(null);

  // Exact timestamp when the test finishes.
  const endTimeRef =
    useRef(null);

  /*
   * Recent typing samples used by the startup rolling WPM
   * calculation.
   *
   * Each sample stores:
   * - time
   * - correct character count
   */
  const wpmSamplesRef =
    useRef([]);

  const inputRef =
    useRef(null);

  const timerRef =
    useRef(null);

  const wpmUpdateRef =
    useRef(null);

  const restartFocusRef = useRef(null);
  const modalOpenRef = useRef(false);
  modalOpenRef.current = showLightbox || Boolean(legalType);

  useEffect(() => {
    if (showLightbox || legalType) {
      cancelAnimationFrame(restartFocusRef.current);
    }

    return () => cancelAnimationFrame(restartFocusRef.current);
  }, [showLightbox, legalType]);

  // ─── Matrix result effect ─────────────────────────────────────────
  useEffect(() => {
    let rain;

    if (isFinished) {
      rain =
        startMatrix("matrix-bg");
    }

    return () => {
      clearInterval(rain);
    };
  }, [isFinished]);

  // ─── Character statistics ─────────────────────────────────────────
  const correctChars =
    userInput
      .split("")
      .filter(
        (ch, i) =>
          ch === paragraph[i]
      ).length;

  const totalTyped =
    userInput.length;

  // ─── Accuracy calculation ─────────────────────────────────────────
  const accuracy =
    totalTyped > 0
      ? Math.round(
          (correctChars /
            totalTyped) *
            100
        )
      : 100;

  // ─── Live WPM calculation ─────────────────────────────────────────
  const calculateLiveWpm =
    useCallback(
      (
        correctCount,
        elapsed
      ) => {
        if (
          startTimeRef.current === null ||
          elapsed <= 0 ||
          correctCount <= 0
        ) {
          return 0;
        }

        const elapsedSeconds =
          elapsed / 1000;

        /*
         * First 3 seconds:
         * Use recent typing samples rather than dividing
         * directly by the tiny total elapsed time.
         */
        if (
          elapsedSeconds <
          WPM_STABILIZATION_TIME /
            1000
        ) {
          const now =
            performance.now();

          const samples =
            wpmSamplesRef.current;

          const windowStart =
            now -
            WPM_STABILIZATION_TIME;

          /*
           * Remove samples outside the rolling window.
           */
          while (
            samples.length > 0 &&
            samples[0].time <
              windowStart
          ) {
            samples.shift();
          }

          /*
           * We need at least two samples to establish
           * a meaningful typing interval.
           */
          if (
            samples.length <
            2
          ) {
            return 0;
          }

          const first =
            samples[0];

          const last =
            samples[
              samples.length - 1
            ];

          const windowMs =
            last.time -
            first.time;

          /*
           * Never calculate a rate using less than
           * one second of elapsed time.
           */
          const effectiveWindowMs =
            Math.max(
              windowMs,
              1000
            );

          const charsTyped =
            Math.max(
              0,
              last.correctChars -
                first.correctChars
            );

          /*
           * During the first second, use the total number
           * of characters typed but still divide by at least
           * one second.
           */
          const effectiveChars =
            windowMs < 1000
              ? last.correctChars
              : charsTyped;

          const minutes =
            effectiveWindowMs /
            60000;

          return Math.round(
            (effectiveChars / 5) /
              minutes
          );
        }

        /*
         * After stabilization, use standard full-test
         * NET WPM.
         */
        wpmSamplesRef.current = [];

        const elapsedMinutes =
          elapsed / 60000;

        return Math.round(
          (correctCount / 5) /
            elapsedMinutes
        );
      },
      []
    );

  // ─── Final WPM calculation ────────────────────────────────────────
  /*
   * This value is always calculated using the exact full-test
   * elapsed time and is therefore independent of the live
   * stabilization logic.
   */
  const finalWpm =
    elapsedMs > 0
      ? Math.round(
          (correctChars / 5) /
            (elapsedMs / 60000)
        )
      : 0;

  /*
   * While typing, display the stabilized live WPM.
   * On the result screen, display the exact final WPM.
   */
  const wpm =
    isFinished
      ? finalWpm
      : displayWpm;

  // ─── Display time ─────────────────────────────────────────────────
  const timeTaken =
    Math.min(
      totalTime,
      Math.round(
        elapsedMs / 1000
      )
    );

  const timeLeft =
    Math.max(
      0,
      totalTime -
        Math.floor(
          elapsedMs / 1000
        )
    );

  // ─── High-precision timer ─────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) {
      clearInterval(
        timerRef.current
      );

      clearInterval(
        wpmUpdateRef.current
      );

      return;
    }

    const updateElapsed = () => {
      if (
        startTimeRef.current ===
        null
      ) {
        return;
      }

      const now =
        performance.now();

      const elapsed =
        now -
        startTimeRef.current;

      if (
        elapsed >=
        totalTime * 1000
      ) {
        const exactElapsed =
          totalTime * 1000;

        setElapsedMs(
          exactElapsed
        );

        /*
         * At timeout, always use exact final WPM.
         */
        const finalElapsedMinutes =
          exactElapsed /
          60000;

        const finalCorrectChars =
          userInput
            .split("")
            .filter(
              (ch, i) =>
                ch === paragraph[i]
            ).length;

        const finalWpm =
          finalElapsedMinutes >
          0
            ? Math.round(
                (finalCorrectChars /
                  5) /
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

        setIsFinished(
          true
        );

        setIsRunning(
          false
        );

        return;
      }

      setElapsedMs(
        elapsed
      );

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
    totalTime,
  ]);

  // ─── Auto-focus hidden textarea ───────────────────────────────────
  // Focus is requested by the user, never on mount or behind a dialog.

  // ─── Handle typing input ───────────────────────────────────────────
  const handleInput =
    useCallback(
      (val) => {
        if (isFinished || modalOpenRef.current) return;

        const now = performance.now();

        // An input event can arrive before a throttled interval catches up.
        if (
          startTimeRef.current !== null &&
          now - startTimeRef.current >= totalTime * 1000
        ) {
          setElapsedMs(totalTime * 1000);
          endTimeRef.current = startTimeRef.current + totalTime * 1000;
          clearInterval(timerRef.current);
          clearInterval(wpmUpdateRef.current);
          setIsFinished(true);
          setIsRunning(false);
          return;
        }

        val = val.slice(0, paragraph.length);

        if (val === userInput) return;

        /*
         * Start timing exactly on the first actual input.
         */
        if (
          startTimeRef.current === null &&
          val.length > 0
        ) {
          startTimeRef.current =
            now;

          endTimeRef.current =
            null;

          /*
           * Seed the rolling sample list with
           * the initial state.
           */
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
         * Calculate correct characters for the new input.
         */
        const newCorrectChars =
          val
            .split("")
            .filter(
              (ch, i) =>
                ch === paragraph[i]
            ).length;

        /*
         * Add the current typing sample.
         */
        if (
          startTimeRef.current !==
            null &&
          val.length > 0 &&
          now - startTimeRef.current < WPM_STABILIZATION_TIME
        ) {
          wpmSamplesRef.current.push(
            {
              time:
                performance.now(),
              correctChars:
                newCorrectChars,
            }
          );
        } else if (
          startTimeRef.current !== null &&
          now - startTimeRef.current >= WPM_STABILIZATION_TIME
        ) {
          wpmSamplesRef.current = [];
        }

        setUserInput(val);

        /*
         * Finish immediately when the passage
         * is completely typed.
         */
        if (
          val.length >=
          paragraph.length
        ) {
          if (
            startTimeRef.current !==
            null
          ) {
            const exactElapsed =
              Math.min(
                totalTime * 1000,
                now -
                  startTimeRef.current
              );

            setElapsedMs(
              exactElapsed
            );

            /*
             * Final WPM always uses exact elapsed time.
             */
            const elapsedMinutes =
              exactElapsed /
              60000;

            const exactFinalWpm =
              elapsedMinutes >
              0
                ? Math.round(
                    (newCorrectChars /
                      5) /
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

          setIsFinished(
            true
          );

          setIsRunning(
            false
          );
        }
      },
      [
        isFinished,
        paragraph,
        totalTime,
        userInput,
      ]
    );

  // ─── Reset everything ──────────────────────────────────────────────
  const handleRestart =
    useCallback(
      (options = {}) => {
        cancelAnimationFrame(restartFocusRef.current);
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

        if (options.focus !== false) {
          restartFocusRef.current = requestAnimationFrame(() => {
            if (!modalOpenRef.current) inputRef.current?.focus();
          });
        }
      },
      [difficulty]
    );

  // ─── Change difficulty and reset ───────────────────────────────────
  const handleDifficulty =
    (d) => {
      if (!Object.prototype.hasOwnProperty.call(PARAGRAPHS, d)) return;
      cancelAnimationFrame(restartFocusRef.current);
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
    };

  const handleDuration = (seconds) => {
    if (![15, 30, 60, 120].includes(seconds) || seconds === totalTime) return;
    setTotalTime(seconds);
    handleRestart({ focus: false });
  };

  // ─── Tab key = restart shortcut ───────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (modalOpenRef.current || e.isComposing) return;

      if (e.key === "Escape" && e.target === inputRef.current) {
        inputRef.current.blur();
        return;
      }

      if (
        e.key === "Tab" &&
        e.target === inputRef.current &&
        userInput.length > 0 &&
        !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey
      ) {
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
  }, [handleRestart, userInput.length]);

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
          There Is Something Wrong With You,
          And I Love It.
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
              totalTime={
                totalTime
              }
            />

            <LiveStats
              wpm={wpm}
              accuracy={
                accuracy
              }
              correctChars={
                correctChars
              }
              totalTyped={
                totalTyped
              }
              onRestart={
                handleRestart
              }
            />

            <TypingBox
              paragraph={
                paragraph
              }
              userInput={
                userInput
              }
              onInput={
                handleInput
              }
              isFinished={
                isFinished
              }
              inputRef={
                inputRef
              }
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
              <a
                href="https://junaidahamed.runs-on.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Junaid's personal website (opens in a new tab)"
                title="Junaid's website"
              >
                <FaGlobe />
              </a>
            </div>
          </>
        ) : (
          <Result
            wpm={wpm}
            accuracy={
              accuracy
            }
            timeTaken={
              timeTaken
            }
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

