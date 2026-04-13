import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

// ─── Paragraphs ───────────────────────────────────────────────────────────

const PARAGRAPHS = {
  easy: [
	//ADD ONE SPACE AT BEGINNING OF SOURCE

    {
      text: "Once there were four children named Peter, Susan, Edmund, and Lucy who were sent away from London to live in a large old house full of rooms and long quiet hallways.",
      source: " The Lion, the Witch and the Wardrobe · C.S. Lewis · Chapter 1",
      image: "/assets/lionwitchwardrobe.png",
    },
	
	//!!!!!! NOTE TO SELF: DO NOT FORGET THE COMMAS AFTER TEXT AND SOURCE ALSO !!!!!!
	
	{
		text: "The Cat in the Hat came in with a bump and a grin, saying he could show tricks and games to make a dull rainy day much more fun for everyone in the house.",
		source: " The Cat in the Hat · Dr. Seuss · Opening Section",
    image: "/assets/catinthehat.png",
	},
	
	{
		text: "Max sailed off through night and day and in and out of weeks and almost over a year to where the wild things are, and he found creatures who roared their terrible roars.",
		source: " Where the Wild Things Are · Maurice Sendak · Journey Scene",
    image: "/assets/wherethewildthingsare.png",
	},
	
	{
		text: "I will not eat them in a house, I will not eat them with a mouse, I do not like them here or there, I do not like them anywhere, but I might try them someday.",
		source: " Green Eggs and Ham · Dr. Seuss · Repetition Section",
    image: "/assets/greeneggsandham.png",
	},
	
	{
		text: "In a small green room there was a quiet bed and a bright moon shining through the window, and everything slowly grew calm as the night became deeper and softer.",
		source: " Goodnight Moon · Margaret Wise Brown · Closing Scene",
    image: "/assets/goodnightmoon.png",
	},
  ],
  medium: [
	{
		text: "It was the best of times, it was the worst of times, a period filled with hope and despair, where everything seemed possible yet uncertain, and the world moved forward in ways no one could fully understand.",
		source: " A Tale of Two Cities · Charles Dickens · Book 1, Chapter 1" ,
    image: "/assets/taleoftwocities.png",
	},
	
	{
		text: "Call me Ishmael. Some years ago, never mind how long precisely, I found myself drawn to the sea, seeking a sense of purpose and adventure in a world that often felt too confined.",
		source: " Moby Dick · Herman Melville · Chapter 1" ,
    image: "/assets/mobydick.png",

	},
	
	{
		text: "It is a truth universally acknowledged that a single man of fortune must be in want of a wife, though the feelings and views of such a man may be quite unknown to those around him.",
		source: " Pride and Prejudice · Jane Austen · Chapter 1" ,
    image: "/assets/prideandprejudice.png",
	},
	
	{
		text: "The man in black fled across the desert, and the gunslinger followed, moving steadily under the burning sun, driven by a purpose that stretched far beyond the horizon.",
		source: " The Gunslinger · Stephen King · Chapter 1" ,
    image: "/assets/gunslinger.png",
	},
	//comment to commit
	{
		text: "All we have to decide is what to do with the time that is given to us, for even the smallest choices can shape the path ahead and lead us toward courage or regret.",
		source: " The Fellowship of the Ring · J.R.R. Tolkien · Book 1" ,
    image: "/assets/fellowshipofthering.png",
	},
  ],
  hard: [
	{
		text: "The laws of physics remain consistent across all inertial frames of reference, forming the basis of relativity, where measurements of time and space depend on the observer, yet the fundamental principles governing them remain unchanged.",
		source: " Relativity: The Special and General Theory · Albert Einstein · Part 1",
    image: "/assets/relativity.png",
	},

	{
		text: "Natural selection operates through the preservation of favorable variations and the rejection of harmful ones, gradually shaping species over generations as organisms adapt to their environment in subtle yet powerful ways.",
		source: " On the Origin of Species · Charles Darwin · Chapter 4",
    image: "/assets/originofspecies.png",
	},
	
	{
		text: "Programs must be written for people to read and only incidentally for machines to execute, emphasizing clarity, structure, and abstraction as essential qualities in the development of reliable and maintainable software systems.",
		source: " Structure and Interpretation of Computer Programs · Abelson & Sussman · Chapter 1",
    image: "/assets/structureandinterpretationofcomputerprograms.png",
	},

	{
		text: "Information can be understood as the resolution of uncertainty, where communication systems are designed to encode, transmit, and decode messages efficiently while minimizing loss and distortion in the presence of noise.",
		source: " A Mathematical Theory of Communication · Claude Shannon · Section 1",
    image: "/assets/mathematicaltheoryofcommunication.png",
	},

	{
		text: "The universe follows a set of laws that may not always align with human intuition, yet through observation, mathematics, and experimentation, we can gradually uncover patterns that explain even the most complex phenomena.",
		source: " The Grand Design · Stephen Hawking · Chapter 1",
    image: "/assets/granddesign.png",
	},


  ],
  code: [
    //IMAGE SECTION NOT NEEDED FOR CODE it looks uglygi
    {
      text: "int bs(int a[],int n,int x){int l=0,r=n-1;while(l<=r){int m=(l+r)/2;if(a[m]==x)return m;else if(a[m]<x)l=m+1;else r=m-1;}return -1;}",
      source: " Binary Search",
    },
	
	{
      text: "void bubble(int a[],int n){for(int i=0;i<n;i++)for(int j=0;j<n-i-1;j++)if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;}}",
      source: " Bubble Sort",
    },
	
	{
      text: "int fact(int n){if(n<=1)return 1;return n*fact(n-1);} int main(){int x=5;printf(\"%d\",fact(x));}",
      source: " Factorial (Recursion)",
    },
	
	{
      text: "int fib(int n){if(n<=1)return n;int a=0,b=1,c;for(int i=2;i<=n;i++){c=a+b;a=b;b=c;}return b;}",
      source: " Fibonacci (Iterative)",
    },
	
	{
      text: "int lin(int a[],int n,int x){for(int i=0;i<n;i++)if(a[i]==x)return i;return -1;}",
      source: " Linear Search",
    },
	
  ],
};

function getRandomParagraph(difficulty) {
  const list = PARAGRAPHS[difficulty];
  const item = list[Math.floor(Math.random() * list.length)];

  // If it's already an object (UPDATED), return it
  if (typeof item === "object") return item;
  
  /* UNNECESSARY SECTION, ALL CONVERTED TO OBJECTS
  // If it's a string (NOT UPDATED), wrap it
  return {
    text: item,
    source: "Unknown Source",
  };
  */
}

function getPerformanceLabel(wpm) {
  if (wpm >= 80) return { label: "Expert", color: "#ff6b35" };
  if (wpm >= 60) return { label: "Advanced", color: "#39ff14" };
  if (wpm >= 40) return { label: "Intermediate", color: "#00d4ff" };
  if (wpm >= 20) return { label: "Beginner", color: "#ffd700" };
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
function Result({ wpm, accuracy, timeTaken, source,image, onRestart }) {
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
export default function App() {
  const TOTAL_TIME = 60;

  const [difficulty, setDifficulty] = useState("medium");
  const [paragraphData, setParagraphData] = useState(() =>
    getRandomParagraph("medium")
  );
  const paragraph = paragraphData.text;  const [userInput, setUserInput] = useState("");
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
    setParagraphData(newParagraph);
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
    setParagraphData(newParagraph);
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
		  <span className="logo-type">Type</span>
		  <span className="logo-dot">.</span>
		  <span className="logo-shift">Shift</span>
		  <span className="logo-bracket">]</span>
		</div>
        <p className="tagline">There are no two words in the English language more harmful than "good job"</p>
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
              onRestart={handleRestart}
            />
            <TypingBox
              paragraph={paragraph}
              userInput={userInput}
              onInput={handleInput}
              isFinished={isFinished}
              inputRef={inputRef}
            />
            <p className="shortcut-hint">tab → restart</p>
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
                href="https://www.linkedin.com/in/junaid-ahamed-77920a346/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
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
        Open Source · With Love · By Junaid
      </footer>
    </div>
  );
}