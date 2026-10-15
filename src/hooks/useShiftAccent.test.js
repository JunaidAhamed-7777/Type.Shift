import { act, fireEvent, render } from "@testing-library/react";
import useShiftAccent from "./useShiftAccent";

function AccentHarness() {
  useShiftAccent();
  return null;
}

let mobile;
let hidden;
let mediaListeners;

beforeEach(() => {
  jest.useFakeTimers();
  mobile = false;
  hidden = false;
  mediaListeners = new Set();
  jest.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  window.matchMedia = jest.fn(() => ({
    get matches() {
      return mobile;
    },
    addEventListener: (event, listener) => mediaListeners.add(listener),
    removeEventListener: (event, listener) => mediaListeners.delete(listener),
  }));
  delete document.documentElement.dataset.accent;
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  delete document.documentElement.dataset.accent;
});

test("desktop accents follow Shift and ignore unrelated keys", () => {
  render(<AccentHarness />);
  expect(document.documentElement.dataset.accent).toBe("green");
  fireEvent.keyDown(window, { key: "a" });
  expect(document.documentElement.dataset.accent).toBe("green");
  fireEvent.keyDown(window, {
    key: "Shift",
    code: "ShiftLeft",
    shiftKey: true,
  });
  expect(document.documentElement.dataset.accent).toBe("red");
  fireEvent.keyDown(window, { key: "a", shiftKey: true });
  expect(document.documentElement.dataset.accent).toBe("red");
  fireEvent.keyDown(window, {
    key: "Shift",
    code: "ShiftRight",
    shiftKey: true,
  });
  fireEvent.keyUp(window, { key: "Shift", code: "ShiftLeft", shiftKey: true });
  expect(document.documentElement.dataset.accent).toBe("red");
  fireEvent.keyUp(window, {
    key: "Shift",
    code: "ShiftRight",
    shiftKey: false,
  });
  expect(document.documentElement.dataset.accent).toBe("green");
  act(() => jest.advanceTimersByTime(30000));
  expect(document.documentElement.dataset.accent).toBe("green");
});

test("window blur releases a held Shift accent", () => {
  render(<AccentHarness />);
  fireEvent.keyDown(window, { key: "Shift", shiftKey: true });
  fireEvent.blur(window);
  expect(document.documentElement.dataset.accent).toBe("green");
});

test("mobile accents alternate every five seconds", () => {
  mobile = true;
  render(<AccentHarness />);
  expect(document.documentElement.dataset.accent).toBe("green");
  act(() => jest.advanceTimersByTime(4999));
  expect(document.documentElement.dataset.accent).toBe("green");
  act(() => jest.advanceTimersByTime(1));
  expect(document.documentElement.dataset.accent).toBe("red");
  act(() => jest.advanceTimersByTime(5000));
  expect(document.documentElement.dataset.accent).toBe("green");
});

test("responds to switching between desktop and mobile viewports", () => {
  render(<AccentHarness />);
  act(() => {
    mobile = true;
    mediaListeners.forEach((listener) => listener({ matches: true }));
  });
  act(() => jest.advanceTimersByTime(5000));
  expect(document.documentElement.dataset.accent).toBe("red");
  act(() => {
    mobile = false;
    mediaListeners.forEach((listener) => listener({ matches: false }));
  });
  expect(document.documentElement.dataset.accent).toBe("green");
  act(() => jest.advanceTimersByTime(15000));
  expect(document.documentElement.dataset.accent).toBe("green");
});

test("does not cycle while the document is hidden and resumes when visible", () => {
  mobile = true;
  render(<AccentHarness />);
  act(() => jest.advanceTimersByTime(5000));
  expect(document.documentElement.dataset.accent).toBe("red");
  hidden = true;
  fireEvent(document, new Event("visibilitychange"));
  const pausedAccent = document.documentElement.dataset.accent;
  act(() => jest.advanceTimersByTime(10000));
  expect(document.documentElement.dataset.accent).toBe(pausedAccent);
  hidden = false;
  fireEvent(document, new Event("visibilitychange"));
  const resumedAccent = document.documentElement.dataset.accent;
  act(() => jest.advanceTimersByTime(4999));
  expect(document.documentElement.dataset.accent).toBe(resumedAccent);
  act(() => jest.advanceTimersByTime(1));
  expect(document.documentElement.dataset.accent).not.toBe(resumedAccent);
});

test("cleans viewport listeners, keyboard events, and the mobile timer on unmount", () => {
  mobile = true;
  const view = render(<AccentHarness />);
  expect(mediaListeners.size).toBe(1);
  view.unmount();
  expect(mediaListeners.size).toBe(0);
  document.documentElement.dataset.accent = "unmounted";
  fireEvent.keyDown(window, { key: "Shift", shiftKey: true });
  fireEvent.keyUp(window, { key: "Shift", shiftKey: false });
  fireEvent.blur(window);
  fireEvent(document, new Event("visibilitychange"));
  act(() => jest.advanceTimersByTime(15000));
  expect(document.documentElement.dataset.accent).toBe("unmounted");
});
