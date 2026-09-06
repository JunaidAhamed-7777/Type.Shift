import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import { FaGithub } from "react-icons/fa";
import { Analytics } from '@vercel/analytics/react';
import PARAGRAPHS from "./data/paragraphs";
import DarkVeil from "./components/DarkVeil";

// ─── Session‑based "no repeat" tracker ─────────────────────────────
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
    for (let i = 0; i < list.length; i++) available.push(i);
  }

  // Pick a random available index
  const randIdx = available[Math.floor(Math.random() * available.length)];
  used.add(randIdx);   // remember it for this session

  return list[randIdx];
}

// ─── Updated performance rating ──────────────────────────────────────
function getPerformanceLabel(wpm, accuracy, timeTaken) {
  const MAX_WPM = 80;
  const TOTAL_TIME = 60; // seconds

  // Normalise each metric to a 0–100 scale
  const wpmScore = Math.min(wpm, MAX_WPM) / MAX_WPM * 100;
  const accScore = accuracy; // accuracy is already 0–100
  const timeScore = Math.max(0, 100 - (timeTaken / TOTAL_TIME) * 100);

  // Composite score (simple average)
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
function LiveStats({ wpm, accuracy, correctChars, totalTyped, onRestart }) {
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

// ─── Legal Lightbox ─────────────────────────────────────────────────

function LegalLightbox({ type, onClose }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const title = type === "privacy" ? "Privacy Policy" : "Terms of Use";
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
          <h2 id="legal-lightbox-title">{title}</h2>

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
function TypingBox({ paragraph, userInput, onInput, isFinished, inputRef }) {
  const boxRef = useRef(null);
  <div className="typing-box" ref={boxRef}></div>
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
        cls = userInput[i] === char ? "char-correct" : "char-wrong";
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
    <div className="typing-box">
      <div className="text-display" onClick={() => inputRef.current?.focus()}>
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
        <p className="click-hint">↑ Click the text above or just start typing</p>
      )}
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────
function Result({ wpm, accuracy, timeTaken, source, image, onRestart }) {
  const { label, color } = getPerformanceLabel(wpm, accuracy, timeTaken);
  return (
    <div className="result-screen">
      <div className="result-badge" style={{ borderColor: color, color }}>
        {label}
      </div>

      <div className="result-grid">
        <div className="result-card">
          <span className="result-number" style={{ color: "#39ff14" }}>{wpm}</span>
          <span className="result-desc">Words Per Minute</span>
        </div>
        <div className="result-card">
          <span className="result-number" style={{ color: "#00d4ff" }}>{accuracy}%</span>
          <span className="result-desc">Accuracy</span>
        </div>
        <div className="result-card">
          <span className="result-number" style={{ color: "#ffd700" }}>{timeTaken}s</span>
          <span className="result-desc">Time Taken</span>
        </div>
    </div>
		<div className="result-source">
		  <span className="source-label">Source:</span>
		  <span className="source-text">{source}</span>
		</div>

    {image && (
      <div className="result-image">
        <img src={image} alt="Book cover" />
      </div>
    )}

      <button className="restart-btn" onClick={onRestart}>
        ↺ Try Again
      </button>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

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
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgb(83, 169, 43)";
    context.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

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

export default function App() {

  const TOTAL_TIME = 60;

  const [showLightbox, setShowLightbox] = useState(true);
  const [legalType, setLegalType] = useState(null);

  const [difficulty, setDifficulty] = useState("medium");
  const [paragraphData, setParagraphData] = useState(() =>
    getRandomParagraph("medium")
  );
  const paragraph = paragraphData.text;  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  //const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    //let leftRain, rightRain;
    let rain;
    if (isFinished) {
      rain = startMatrix("matrix-bg");
    }

    return () => {
      clearInterval(rain);
    };
  }, [isFinished]);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Count correct characters
  const correctChars = userInput.split("").filter((ch, i) => ch === paragraph[i]).length;
  const totalTyped = userInput.length;
  const elapsedMinutes = Math.max((TOTAL_TIME - timeLeft) / 60, 1 / 60);

  // WPM = (correct chars / 5) / minutes elapsed
  const wpm = isRunning || isFinished ? Math.round(correctChars / 5 / elapsedMinutes) : 0;

  // Accuracy = (correct / total typed) * 100
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  const timeTaken = TOTAL_TIME - timeLeft;

  // ── Timer: counts down every second while isRunning is true
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsFinished(true);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Auto-focus the hidden textarea on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ── Handle typing input
  const handleInput = useCallback(
    (val) => {
      if (isFinished) return;

      // Start timer on first keystroke
      if (!isRunning && val.length > 0) {
        setIsRunning(true);
        //setStartTime(Date.now());
      }

      setUserInput(val);

      // End test if user finishes the full paragraph
      if (val.length >= paragraph.length) {
        clearInterval(timerRef.current);
        setIsFinished(true);
        setIsRunning(false);
      }
    },
    [isRunning, isFinished, paragraph]
  );

  // ── Reset everything
  const handleRestart = useCallback(() => {
    clearInterval(timerRef.current);
    const newParagraph = getRandomParagraph(difficulty);
    setParagraphData(newParagraph);
    setUserInput("");
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setIsFinished(false);
    //setStartTime(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [difficulty]);

  // ── Change difficulty and reset
  const handleDifficulty = (d) => {
    setDifficulty(d);
    clearInterval(timerRef.current);
    const newParagraph = getRandomParagraph(d);
    setParagraphData(newParagraph);
    setUserInput("");
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setIsFinished(false);
    //etStartTime(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ── Tab key = restart shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleRestart]);

  return (

    <div className="app">
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
      <WelcomeLightbox onClose={() => setShowLightbox(false)} />
    )}

    {legalType && (
      <LegalLightbox
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    )}

      {isFinished && (
        <>
          <canvas id="matrix-bg" className="matrix-bg"></canvas>
          <div className="matrix-overlay"></div>
        </>
      )}

      <div className="scanlines" aria-hidden="true" />

      <header className="app-header">
        <div className="logo">
		  <span className="logo-bracket">[</span>
		  <span className="logo-type">Type</span>
		  <span className="logo-dot">.</span>
		  <span className="logo-shift">Shift</span>
		  <span className="logo-bracket">]</span>
		</div>
        <p className="tagline">There are no two words in the English language more harmful than "good job"</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <span className="control-label">Difficulty:</span>
          {["easy", "medium", "hard", "code"].map((d) => (
            <button
              key={d}
              className={`ctrl-btn ${difficulty === d ? "active" : ""}`}
              onClick={() => handleDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <main className="test-area">
        {!isFinished ? (
          <>
            <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} />
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
            <p className="shortcut-hint">TAB → Restart</p>
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
        <div>With Love · For My Avanthika · By Junaid</div>

        <div className="legal-links">
          <button onClick={() => setLegalType("privacy")}>
            Privacy Policy
          </button>

          <span>·</span>

          <button onClick={() => setLegalType("terms")}>
            Terms of Use
          </button>
        </div>
      </footer>
      <Analytics />
    </div>
  );

  

}