import type { ICitySuggestion } from "../interfaces/ICitySuggestion";
import "../styles/WeatherCitySuggestion.css";

export default function CitySuggestion({ name, displayName,onClick }: ICitySuggestion) {
  return (
    <div className="Weather-board-list-city-suggestion" onClick={onClick}>
      <span className="Weather-board-list-cityname">{name}</span>
      <span>{displayName}</span>
    </div>
  );
}
