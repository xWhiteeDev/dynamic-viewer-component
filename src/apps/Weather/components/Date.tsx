import type { IDate } from "../interfaces/IDate";
import { getDayName } from "../services/dateService";
import "../styles/WeatherDate.css";
export default function WeatherDate({date}:IDate) {
  return (
    <div className="Weather-board-date">
      <div className="Weather-board-date-info">
        <span>{getDayName(date,'pl-PL')}</span>
        <span style={{fontSize:"1.2rem"}}>{date}</span>
      </div>
    </div>
  );
}
