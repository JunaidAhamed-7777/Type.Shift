import { useEffect } from "react";

export default function useShiftAccent() {
  useEffect(() => {
    const root = document.documentElement;
    const mobile = window.matchMedia(
      "(max-width: 760px), (hover: none) and (pointer: coarse)",
    );
    let shiftHeld = false;
    let automaticRed = false;
    let cycle;

    const apply = () => {
      root.dataset.accent = shiftHeld || automaticRed ? "red" : "green";
    };

    const restartCycle = () => {
      clearInterval(cycle);
      automaticRed = false;
      apply();
      if (!mobile.matches || document.hidden) return;
      cycle = setInterval(() => {
        automaticRed = !automaticRed;
        apply();
      }, 5000);
    };

    const onKeyDown = (event) => {
      if (event.key !== "Shift") return;
      shiftHeld = true;
      apply();
    };
    const onKeyUp = (event) => {
      if (event.key !== "Shift") return;
      shiftHeld = event.shiftKey;
      apply();
    };
    const onBlur = () => {
      shiftHeld = false;
      apply();
    };
    const onVisibility = () => {
      shiftHeld = false;
      restartCycle();
    };

    restartCycle();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    mobile.addEventListener("change", restartCycle);
    return () => {
      clearInterval(cycle);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      mobile.removeEventListener("change", restartCycle);
      delete root.dataset.accent;
    };
  }, []);
}
