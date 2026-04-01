import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ─── Paragraph Banks ───────────────────────────────────────────────────────────

const PARAGRAPHS = {
  easy: [
    "the cat sat on the mat and looked at the sun the dog ran in the park and had a lot of fun the bird sang a song and flew up to the sky it was a warm and bright day in the month of may",
    "she went to the store to buy some bread and milk she paid for the food and walked back home the air was cool and the birds were singing she felt happy and calm as she walked along the road",
    "he likes to read books and learn new things every day he goes to the library and picks a book to read he sits by the window and reads for many hours he loves stories about space and far away worlds",
    "the sun rises in the east and sets in the west the moon shines at night and lights up the dark sky the stars are tiny dots of light that fill the night we can see them on a clear dark night",
  ],
  medium: [
    "The quick brown fox jumps over the lazy dog near the riverbank. Several birds took flight as the commotion startled them. Nature has a remarkable way of balancing chaos and tranquility in every moment we observe.",
    "Learning to type faster requires consistent practice and focused attention. Your fingers should rest on the home row keys, moving efficiently to each letter. Over time, muscle memory takes over and speed increases naturally.",
    "Modern technology has transformed the way humans communicate and share information. Social networks connect billions of people across different time zones and cultures. Yet meaningful conversation still depends on clarity and thoughtful expression.",
    "Scientists discovered that deep ocean trenches harbor unique ecosystems thriving under extreme pressure. Bioluminescent creatures navigate the perpetual darkness using chemical light. These environments challenge our understanding of where life can exist.",
  ],
  hard: [
    "Cryptographic algorithms, such as RSA and AES-256, protect sensitive data through mathematical complexity. Developers must implement proper key rotation, salted hashing, and secure transport layers (TLS 1.3) to prevent vulnerabilities. Always audit dependencies: one misconfigured package can compromise an entire system!",
    "The phenomenon of \"quantum entanglement\" suggests that particles, once linked, instantaneously affect each other regardless of distance — defying classical physics. Einstein famously called this \"spooky action at a distance.\" Modern quantum computers exploit superposition & entanglement to solve problems exponentially faster.",
    "In distributed systems, the CAP theorem states: consistency, availability, and partition-tolerance cannot all be guaranteed simultaneously. Engineers must make trade-offs; for example, Apache Kafka prioritizes throughput & fault-tolerance over strict consistency. Understanding these trade-offs is crucial for scalable architecture!",
    "Object-oriented design relies on four pillars: encapsulation, abstraction, inheritance, and polymorphism. Well-structured code adheres to SOLID principles — particularly the single-responsibility principle. Refactoring legacy code? Watch for code smells: long methods, deep nesting, and duplicated logic.",
  ],
  code: [
    "const fetchData = async (url) => { try { const res = await fetch(url); if (!res.ok) throw new Error('Network error'); const data = await res.json(); return data; } catch (err) { console.error('Failed:', err.message); return null; } };",
    "function mergeSort(arr) { if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); const left = mergeSort(arr.slice(0, mid)); const right = mergeSort(arr.slice(mid)); return merge(left, right); }",
    "class EventEmitter { constructor() { this.events = {}; } on(event, listener) { if (!this.events[event]) this.events[event] = []; this.events[event].push(listener); } emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); } }",
    "const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }; window.addEventListener('resize', debounce(handleResize, 300));",
  ],
};

function getRandomParagraph(difficulty) {
  const list = PARAGRAPHS[difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

function getPerformanceLabel(wpm) {
  if (wpm >= 80) return { label: "Speed Demon 🔥", color: "#ff6b35" };
  if (wpm >= 60) return { label: "Advanced 🚀", color: "#39ff14" };
  if (wpm >= 40) return { label: "Intermediate ⚡", color: "#00d4ff" };
  if (wpm >= 20) return { label: "Beginner 🌱", color: "#ffd700" };
  return { label: "Keep Practicing 💪", color: "#a0a0a0" };
}

// ─── Timer Component ────────────────────────────────────────────────────────────
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

// ─── Live Stats Component ───────────────────────────────────────────────────────
function LiveStats({ wpm, accuracy, correctChars, totalTyped }) {
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
    </div>
  );
}

// ─── Typing Box Component ───────────────────────────────────────────────────────
function TypingBox({ paragraph, userInput, onInput, isFinished, inputRef }) {
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

// ─── Result Screen Component ────────────────────────────────────────────────────
function Result({ wpm, accuracy, timeTaken, onRestart }) {
  const { label, color } = getPerformanceLabel(wpm);
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
      <button className="restart-btn" onClick={onRestart}>
        ↺ Try Again
      </button>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const TOTAL_TIME = 60;

  const [difficulty, setDifficulty] = useState("medium");
  const [paragraph, setParagraph] = useState(() => getRandomParagraph("medium"));
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);

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
        setStartTime(Date.now());
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
    setParagraph(newParagraph);
    setUserInput("");
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setIsFinished(false);
    setStartTime(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [difficulty]);

  // ── Change difficulty and reset
  const handleDifficulty = (d) => {
    setDifficulty(d);
    clearInterval(timerRef.current);
    const newParagraph = getRandomParagraph(d);
    setParagraph(newParagraph);
    setUserInput("");
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setIsFinished(false);
    setStartTime(null);
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
      <div className="scanlines" aria-hidden="true" />

      <header className="app-header">
        <div className="logo">
          <span className="logo-bracket">[</span>
          type<span className="logo-accent">.</span>speed
          <span className="logo-bracket">]</span>
        </div>
        <p className="tagline">// how fast are your fingers?</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <span className="control-label">difficulty:</span>
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
            />
            <TypingBox
              paragraph={paragraph}
              userInput={userInput}
              onInput={handleInput}
              isFinished={isFinished}
              inputRef={inputRef}
            />
            <p className="shortcut-hint">tab → restart</p>
          </>
        ) : (
          <Result
            wpm={wpm}
            accuracy={accuracy}
            timeTaken={timeTaken}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="app-footer">
        built with React · no backend · pure speed
      </footer>
    </div>
  );
}