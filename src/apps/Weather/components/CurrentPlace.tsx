import type { ICurrentPlace } from "../interfaces/ICurrentPlace";
import "../styles/WeatherCurrentPlace.css";

export default function CurrentPlace({ name = "-----", minTemp = 0, maxTemp = 0, actualTemp = 0, feelsLikeTemp = 0 }: ICurrentPlace) {
  return (
    <div className="Weather-board-currentplace">
      <span className="city-name">{name}</span>
      <span className="forecasted-temp">{minTemp}°C - {maxTemp}°C</span>
      <span className="actual-temp">Aktualna temperatura:{actualTemp}°C</span>
      <span className="feels-like-temp">Odczuwalna temperatura:{feelsLikeTemp}°C</span>
    </div>
  );
}
