import type { TIcon } from "./IWeather";

export interface IHourlyForecast {
    currentTemperature: number;
    hour: string;
    iconType: TIcon
}

export interface IIconModule {
    default: string
}