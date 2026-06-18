import { useEffect, useState } from "react";
import type { IHourlyForecast } from "../interfaces/IHourlyForecast";
import "../styles/WeatherHourlyForecast.css";
import { fetchIcon } from "../services/weatherService";

export default function HourlyForecast({ currentTemperature, hour, iconType }: IHourlyForecast) {
  const [icon, setIcon] = useState<string>();
  useEffect(() => {
    fetchIcon(iconType)
      .then((ic) => setIcon(ic.default))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="Weather-forecast-hourly-forecast">
      <img src={icon} alt="" />
      <span className="Weather-forecast-currentTemperature">~{currentTemperature}°C</span>
      <span className="Weather-forecast-hour">{hour}</span>
    </div>
  );
}
