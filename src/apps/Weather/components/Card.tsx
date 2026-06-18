import type { ICard } from "../interfaces/ICard";
import { fetchIcon } from "../services/weatherService";
import "../styles/WeatherCard.css";
import { useEffect, useState } from "react";

export default function Card({ type, result, iconType }: ICard) {
  const [icon, setIcon] = useState<string>();
  useEffect(() => {
    if (!iconType) return;
    fetchIcon(iconType)
      .then((res) => setIcon(res.default))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="Weather-board-card">
      <div className="Weather-board-card-icon">
        <img src={icon} alt="" />
      </div>
      <div className="Weather-board-card-type">
        <span>{type}</span>
      </div>
      <div className="Weather-board-card-result">
        <span>{result}</span>
      </div>
    </div>
  );
}
