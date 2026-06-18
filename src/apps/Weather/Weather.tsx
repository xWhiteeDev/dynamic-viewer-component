import { useContext, useRef, useState } from "react";
import { type ICity, type ICurrentCity, type IDay, type TCities } from "./interfaces/IWeather";
import { fetchWeatherForCity, getCities } from "./services/weatherService";
import { getActualDate } from "./services/dateService";
import { AppContext } from "../../main/services/context";
import { CustomError } from "./services/error";
import "./styles/Weather.css";

import CurrentPlace from "./components/CurrentPlace";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import DailyForecast from "./components/DailyForcast";
import HourlyForecast from "./components/HourlyForecast";
import ScrollButton from "./components/ScrollButton";
import CitiesList from "./components/CitiesList";
import WeatherDate from "./components/Date";
import CitySuggestion from "./components/CitySuggestion";

export default function Weather() {
  const [suggestedCities, setSuggestCities] = useState<TCities>([]);
  const [scrollButtonState, setScrollButtonState] = useState({ right: true, left: false });
  const [currentCity, setCurrentCityData] = useState<ICurrentCity>();
  const [todayForecast, setForecastToday] = useState<IDay | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const notifyContext = useContext(AppContext);
  async function handleSearchConfirm(text: string): Promise<void> {
    try {
      const specifiedCities = await getCities(text);
      if (!specifiedCities || specifiedCities.length == 0) {
        throw new CustomError("City not found", "404", "CLIENT_ERROR");
      }
      setSuggestCities(specifiedCities);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        if (notifyContext) notifyContext({ type: "Error", message: error.message, code: error.code, codeSubName: error.codeSubName });
      }
    }
  }

  async function handleClickSuggestion(city: ICity): Promise<void> {
    try {
      const data = await fetchWeatherForCity(city.lat, city.lon);
      if (!data || (data && !data.currentConditions) || !data.days) {
        throw new CustomError("Server had problem with fetch weather for that city", "500", "FETCH_ERROR");
      }
      const days = data.days.slice(0, 10);
      setCurrentCityData({ ...data, days, name: city.name });
      const dailyForecast = data.days.find((el) => el.datetime === getActualDate()) ?? data.days[0];
      setForecastToday(dailyForecast);
      setSuggestCities([]);
    } catch (error) {
      console.error(error)
      if (error instanceof CustomError) {
        if (notifyContext) notifyContext({ type: "Error", message: error.message, code: error.code, codeSubName: error.codeSubName });
      }
    }
  }
  function handleScrollButtonClick(direction: "left" | "right"): void {
    if (!ref.current) return;
    const scrollMove = 40;

    if (direction == "left") {
      ref.current.scrollLeft -= scrollMove;
      if (ref.current.scrollLeft <= 0) {
        setScrollButtonState({ right: true, left: false });
      } else {
        setScrollButtonState((prev) => ({ ...prev, right: true }));
      }
    } else {
      const newScroll = ref.current.scrollLeft + scrollMove;
      ref.current.scrollLeft = newScroll;
      if (newScroll + ref.current.clientWidth >= ref.current.scrollWidth) {
        setScrollButtonState({ right: false, left: true });
      } else {
        setScrollButtonState((prev) => ({ ...prev, left: true }));
      }
    }
  }

  return (
    <div className="Weather-board">
      <div className="Weather-board-grid-first">
        <WeatherDate date={getActualDate()} />
        {currentCity && todayForecast && (
          <CurrentPlace
            name={currentCity.name}
            actualTemp={currentCity.currentConditions.temp}
            minTemp={todayForecast.tempmin}
            maxTemp={todayForecast.tempmax}
            feelsLikeTemp={currentCity.currentConditions.feelslike}
          />
        )}
        <SearchBar onConfirm={handleSearchConfirm} />
        {suggestedCities.length > 0 && (
          <CitiesList>
            {suggestedCities.map((city, index) => (
              <CitySuggestion
                key={index}
                name={city.name}
                onClick={() => {
                  handleClickSuggestion(city);
                }}
                displayName={city.displayName}
              />
            ))}
          </CitiesList>
        )}
      </div>
      <div className="Weather-board-grid-second">
        {todayForecast && currentCity && (
          <>
            <Card iconType="rain" type="Prawdopodobieństwo opadów" result={`${currentCity.currentConditions.precipprob}%`} />
            <Card iconType="uv-index" type="Indeks UV" result={todayForecast.uvindex} />
            <Card iconType="wind" type="Prędkość wiatru" result={`${todayForecast.windspeed} km/h`} />
          </>
        )}
      </div>
      <div className="Weather-board-grid-third" ref={ref}>
        {todayForecast && todayForecast.hours.map((el, i) => <HourlyForecast key={i} currentTemperature={el.temp} hour={`${el.datetime.slice(0, 5)}`} iconType={el.icon} />)}
      </div>

      {scrollButtonState.right && todayForecast && (
        <ScrollButton
          scrollSide="right"
          onClick={() => {
            handleScrollButtonClick("right");
          }}
        />
      )}
      {scrollButtonState.left && (
        <ScrollButton
          scrollSide="left"
          onClick={() => {
            handleScrollButtonClick("left");
          }}
        />
      )}
      <div className="Weather-board-grid-fourth">{currentCity && currentCity.days.map((el, i) => <DailyForecast key={i} min={el.tempmin} max={el.tempmax} date={el.datetime} />)}</div>
    </div>
  );
}
