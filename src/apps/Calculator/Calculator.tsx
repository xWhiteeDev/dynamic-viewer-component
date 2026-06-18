import { useState } from "react";
import "./styles/Calculator.css";
import { calculatorService } from "./services/calculatorService";
import { buttons } from "./assets/calculatorAssets";

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const handleOnClick = (btn: string) => {
    if (btn === "=") {
      const isValidInput = /^[0-9+\-*/().\s]+$/.test(input);
      if (!isValidInput) {
        setInput("Error");
        return;
      }
      try {
        const result = new Function(`"use strict"; return (${input})`)();
        setInput(String(result));
      } catch {
        setInput("Error");
      }
      return;
    }
    if (btn === "AC") {
      setInput("");
      return;
    }
    if (btn === "C") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    if (btn === "+/-") {
      if (!input) return;
      if (input.startsWith("-")) {
        setInput(input.slice(1));
      } else {
        setInput(`-${input}`);
      }
    } else {
      setInput((prev) => `${prev}${btn}`);
    }
  };
  return (
    <div className="Calculator-container">
      <div className="Calculator-result">
        <span>{input}</span>
      </div>
      <div className="Calculator-grid">
        {buttons.map((v, i) => (
          <button key={i} className={`calc-btn ${calculatorService.getButtonClass(v)}`} onClick={() => handleOnClick(v)}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
