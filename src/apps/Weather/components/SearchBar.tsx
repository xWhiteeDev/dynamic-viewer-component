import { useState } from "react";
import "../styles/WeatherInput.css";
import type { ISearchBar } from "../interfaces/ISearchBar";
export default function SearchBar({ onConfirm, children }: ISearchBar) {
  const [text, setText] = useState<string>("");
  return (
    <div className="Weather-board-searchbar">
      <input
        type="text"
        name=""
        id=""
        placeholder="Wpisz miejscowość..."
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            onConfirm(text);
          }
        }}
        onInput={(event) => setText(event.currentTarget.value)}
      />
      {children}
    </div>
  );
}
