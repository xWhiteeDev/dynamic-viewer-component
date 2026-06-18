import { Children } from "react";
import type { ICitiesList } from "../interfaces/ICitiesList";
import '../styles/WeatherCitiesList.css'
export default function CitiesList({ children }: ICitiesList) {
  return (
    <div className="Weather-board-cities-list">
      {Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
}
