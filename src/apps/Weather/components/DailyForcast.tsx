import type { IDailyForecast } from "../interfaces/IDailyForecast";
import "../styles/WeatherDailyForecast.css";

export default function DailyForecast({ min = 0, max = 1, date = "UNK" }: IDailyForecast) {
  return (
    <div className="Weather-forecast-daily-forecast">
      <span className="Weather-forecast-minimum">Min:{min}</span>
      <span className="Weather-forecast-maximum">Max:{max}</span>
      <span className="Weather-forecast-date">{date}</span>
    </div>
  );
}
