import type { ICityWeather, Module, TFetchedCities } from "../interfaces/IWeather";
import { CustomError } from "./error";

export async function getCities(cityName: string) {
  if (!cityName) return;
  try {
    const seenCities = new Set<string>()
    const res = await fetch(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${cityName}&format=jsonv2&limit=10`, { method: "GET", priority: "high" });
    if (!res.ok) {
      throw new CustomError(res.statusText, `${res.status}`)
    }
    const data: TFetchedCities = await res.json();

    const cities = data.map(el => {
      const splitedDisplayName = el.display_name.split(',', 2);
      const fullDisplayName = splitedDisplayName.join(',')
      return { displayName: fullDisplayName, name: el.name, lon: el.lon, lat: el.lat }
    })
    const listOfSuggestedCities = cities.filter(city => {
      if (seenCities.has(city.displayName)) {
        return false
      }
      seenCities.add(city.displayName)
      return true
    })
    return listOfSuggestedCities;
  } catch (error) {
    if (error instanceof CustomError) throw error
    if (error instanceof Error) {
      throw new CustomError(error.message, 'UNK')
    } else {
      throw new CustomError('Unknown error', 'UNK')
    }
  }

}

export async function fetchIcon(icon: string) {
  const files = import.meta.glob<Module>("../assets/icons/*.svg");
  return files[`../assets/icons/${icon}.svg`]();
}


export async function fetchWeatherForCity(lat: number, lon: number): Promise<ICityWeather> {
  try {
    if (isNaN(lon) || isNaN(lat)) {
      throw new Error('One of argument is empty or type isnt number!')
    }
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${import.meta.env.VITE_WEATHER_API_KEY}`
    const res = await fetch(url, { method: "GET" })
    if (!res.ok) {
      throw new CustomError(res.statusText, `${res.status}`)
    }
    const data = await res.json()
    return data as ICityWeather
  } catch (error) {
    if (error instanceof CustomError) throw error
    if (error instanceof Error) {
      throw new CustomError(error.message, 'UNK')
    } else {
      throw new CustomError('Unknown error', 'UNK')
    }
  }
}
