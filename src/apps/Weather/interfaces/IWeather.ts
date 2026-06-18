export type TCities = ICity[]

export interface ICity {
    displayName: string;
    name: string;
    lon: number;
    lat: number;
}

export type TFetchedCities = IFetchedCity[]

export interface IFetchedCity {
    display_name: string;
    name: string;
    lon: number;
    lat: number;
}

export type TIcon =
    | 'clear-day'
    | 'clear-night'
    | 'cloudy'
    | 'fog'
    | 'hail'
    | 'partly-cloudy-day'
    | 'partly-cloudy-night'
    | 'rain'
    | 'rain-snow'
    | 'rain-snow-showers-day'
    | 'rain-snow-showers-night'
    | 'showers-day'
    | 'showers-night'
    | 'sleet'
    | 'snow'
    | 'snow-showers-day'
    | 'snow-showers-night'
    | 'thunder'
    | 'thunder-rain'
    | 'thunder-showers-day'
    | 'thunder-showers-night'
    | 'wind'
    | 'uv-index';


export interface ICityWeather extends Omit<ICurrentCity,'name'> {}
export interface ICurrentCity {
    name: string
    currentConditions: ICurrentConditions;
    days: IDays
}

interface ICurrentConditions {
    cloudcover: number;
    conditions: string;
    datetime: string;
    datetimeEpoch: number;
    dew: number;
    feelslike: number;
    humidity: number;
    icon: string;
    moonphase: number;
    precip: number;
    precipprob: number;
    preciptype: string | null;
    pressure: number;
    snow: number;
    snowdepth: number;
    solarenergy: number;
    solarradiation: number;
    source: string;
    stations: string[];
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    temp: number;
    uvindex: number;
    visibility: number;
    winddir: number;
    windgust: number;
    windspeed: number;
}

export interface IHour {
    [key: string]: any;
}

export interface IDay {
    cloudcover: number;
    conditions: string;
    datetime: string;
    datetimeEpoch: number;
    description: string;
    dew: number;
    feelslike: number;
    feelslikemax: number;
    feelslikemin: number;
    hours: IHour[];
    humidity: number;
    icon: string;
    moonphase: number;
    precip: number;
    precipcover: number;
    precipprob: number;
    preciptype: string[] | null;
    pressure: number;
    severerisk: number;
    snow: number;
    snowdepth: number;
    solarenergy: number;
    solarradiation: number;
    source: string;
    stations: string[];
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    temp: number;
    tempmax: number;
    tempmin: number;
    uvindex: number;
    visibility: number;
    winddir: number;
    windgust: number;
    windspeed: number;
}

export type IDays = IDay[];
export interface Module {
    default:string
}