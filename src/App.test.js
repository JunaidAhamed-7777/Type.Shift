import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// CRA's Jest resolver predates package exports used by this analytics package.
jest.mock("@vercel/analytics/react", () => ({ Analytics: () => null }), { virtual: true });
jest.mock("./data/paragraphs", () => {
  const passage = { text: "steady hands", source: "Test source" };
  return {
    __esModule: true,
    default: { easy: [passage], medium: [passage], hard: [passage], code: [passage] },
  };
});

let clock;
const originalFetch = global.fetch;

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  clock = 1000;
  jest.spyOn(performance, "now").mockImplementation(() => clock);
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
  Element.prototype.scrollIntoView = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn(function showModal() {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = jest.fn(function close() {
    this.removeAttribute("open");
  });
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  global.fetch = originalFetch;
});

test("waits for actual typing and does not take focus on page load", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  expect(input).not.toHaveFocus();
  const brand = screen.getByRole("link", { name: "Type.Shift home" });
  expect(brand).toHaveTextContent("Type");
  expect(brand).toHaveTextContent("Shift");
  expect(screen.getByText("There Is Something Wrong With You, And I Love It.")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toHaveTextContent(/for my Cheeku/i);

  clock += 120000;
  act(() => jest.advanceTimersByTime(120000));

  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("keeps Tab navigation outside the typing field and with modifiers", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(true);

  fireEvent.change(input, { target: { value: "steady" } });
  expect(fireEvent.keyDown(document.body, { key: "Tab" })).toBe(true);
  expect(fireEvent.keyDown(input, { key: "Tab", shiftKey: true })).toBe(true);
  expect(fireEvent.keyDown(input, { key: "Tab", ctrlKey: true })).toBe(true);
  expect(fireEvent.keyDown(input, { key: "Tab", altKey: true })).toBe(true);
  expect(fireEvent.keyDown(input, { key: "Tab", metaKey: true })).toBe(true);
  expect(input).toHaveValue("steady");
});

test("restarts with an unmodified Tab while typing", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "steady" } });
  expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(false);
  expect(screen.getByRole("textbox")).toHaveValue("");

  clock += 120000;
  act(() => jest.advanceTimersByTime(120000));
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("Escape releases the typing field so Tab can navigate again", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  act(() => input.focus());
  fireEvent.change(input, { target: { value: "steady" } });
  fireEvent.keyDown(input, { key: "Escape" });
  expect(input).not.toHaveFocus();
  expect(fireEvent.keyDown(document.activeElement, { key: "Tab" })).toBe(true);
  expect(input).toHaveValue("steady");
});

test("rejects input after the deadline even before the timer callback runs", () => {
  render(<App />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady" } });

  clock += 60001;
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady hands" } });

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText(/Test source/)).toBeInTheDocument();
});

test("clamps excess input and scores completion using exact elapsed time", () => {
  render(<App />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "s" } });
  clock += 2000;
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "steady hands extra characters" },
  });

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByText("72")).toBeInTheDocument();
  expect(screen.getByText("100")).toHaveTextContent("100%");
  expect(screen.getByRole("heading", { level: 2 })).toHaveFocus();
});

test("changing duration resets the test without moving focus or starting the clock", () => {
  render(<App />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady" } });
  const duration = screen.getByRole("button", { name: /^15\s*(s|seconds)?$/i });
  duration.focus();
  fireEvent.click(duration);

  expect(duration).toHaveFocus();
  expect(duration).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("textbox")).toHaveValue("");
  clock += 15000;
  act(() => jest.advanceTimersByTime(15000));
  expect(screen.getByRole("textbox")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady" } });
  clock += 15000;
  act(() => jest.advanceTimersByTime(100));
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("help blocks background typing, preserves Tab, and restores focus on close", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const about = screen.getByRole("button", { name: /how it works/i });
  about.focus();
  fireEvent.click(about);
  const dialog = screen.getByRole("dialog");
  const close = screen.getByRole("button", { name: "Close dialog" });

  fireEvent.change(input, { target: { value: "steady" } });
  expect(input).toHaveValue("");
  expect(fireEvent.keyDown(close, { key: "Tab" })).toBe(true);
  fireEvent(dialog, new Event("cancel", { cancelable: true }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(about).toHaveFocus();
});

test("changing difficulty resets without moving focus, and reselecting it keeps progress", () => {
  render(<App />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady" } });
  const hard = screen.getByRole("button", { name: "Hard" });
  hard.focus();
  fireEvent.click(hard);

  expect(hard).toHaveFocus();
  expect(hard).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("textbox")).toHaveValue("");
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "steady" } });
  fireEvent.click(hard);
  expect(screen.getByRole("textbox")).toHaveValue("steady");
});

test.each([
  ["paste", "Pasting"],
  ["drop", "Dropping text"],
])("blocks %s with an explanation and leaves the test idle", (eventType, explanation) => {
  render(<App />);
  const input = screen.getByRole("textbox");
  expect(fireEvent[eventType](input, {
    clipboardData: { getData: () => "steady hands" },
    dataTransfer: { getData: () => "steady hands" },
  })).toBe(false);
  expect(input).toHaveValue("");
  expect(screen.getByText(new RegExp(`${explanation} is off`))).toBeInTheDocument();

  clock += 120000;
  act(() => jest.advanceTimersByTime(120000));
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("keeps IME composition visible and starts timing only after it commits", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: "s" } });
  expect(input).toHaveValue("s");

  clock += 120000;
  act(() => jest.advanceTimersByTime(120000));
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(fireEvent.keyDown(input, { key: "Tab", isComposing: true })).toBe(true);
  fireEvent.compositionEnd(input, { data: "s", target: { value: "s" } });
  expect(input).toHaveValue("s");

  clock += 60000;
  act(() => jest.advanceTimersByTime(100));
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});

test("correcting mistakes restores final-text accuracy without restarting elapsed time", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "x" } });
  fireEvent.change(input, { target: { value: "" } });
  clock += 1000;
  fireEvent.change(input, { target: { value: "s" } });
  clock += 1000;
  fireEvent.change(input, { target: { value: "steady hands" } });

  expect(screen.getByText("100")).toHaveTextContent("100%");
  expect(screen.getByText("72")).toBeInTheDocument();
  expect(screen.getByText(/12 correct characters out of 12 typed/)).toBeInTheDocument();
});

test("help can close and reopen while restoring its opener and document scroll", () => {
  render(<App />);
  const opener = screen.getByRole("button", { name: /how it works/i });
  opener.focus();

  for (let opening = 0; opening < 2; opening += 1) {
    fireEvent.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  }
});

test("starts dark and persists appearance choices across remounts", () => {
  const firstRender = render(<App />);
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(localStorage.getItem("typeshift-theme")).toBe("light");
  firstRender.unmount();

  render(<App />);
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(localStorage.getItem("typeshift-theme")).toBe("dark");
});

test("shows legal loading and content, then restores the privacy opener", async () => {
  let resolveRequest;
  global.fetch = jest.fn(() => new Promise((resolve) => { resolveRequest = resolve; }));
  render(<App />);
  const privacy = screen.getByRole("button", { name: "Privacy" });
  privacy.focus();
  fireEvent.click(privacy);

  expect(global.fetch).toHaveBeenCalledWith("/legal/privacy.txt");
  expect(screen.getByRole("status")).toHaveTextContent("Loading document");
  await act(async () => {
    resolveRequest({ ok: true, text: async () => "Test privacy document content." });
  });

  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Privacy Policy" })).toHaveTextContent("Test privacy document content.");
  fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
  expect(privacy).toHaveFocus();
});

test.each(["network", "HTTP"])("shows a usable document link after a %s legal failure", async (failure) => {
  global.fetch = failure === "network"
    ? jest.fn().mockRejectedValue(new Error("Offline"))
    : jest.fn().mockResolvedValue({ ok: false });
  render(<App />);
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Terms" }));
  });

  expect(global.fetch).toHaveBeenCalledWith("/legal/usage.txt");
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent("This document could not be loaded");
  expect(screen.getByRole("link", { name: "Open the document directly" })).toHaveAttribute("href", "/legal/usage.txt");
});

test("ignores a legal response arriving after that document was closed", async () => {
  let resolvePrivacy;
  const privacyResponse = new Promise((resolve) => { resolvePrivacy = resolve; });
  global.fetch = jest.fn((url) => url === "/legal/privacy.txt"
    ? privacyResponse
    : Promise.resolve({ ok: true, text: async () => "Current terms content." }));
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Privacy" }));
  fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Terms" }));
  });
  expect(screen.getByRole("dialog", { name: "Terms of Use" })).toHaveTextContent("Current terms content.");

  await act(async () => {
    resolvePrivacy({ ok: true, text: async () => "Outdated privacy response." });
  });
  expect(screen.queryByText("Outdated privacy response.")).not.toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Terms of Use" })).toHaveTextContent("Current terms content.");
});
