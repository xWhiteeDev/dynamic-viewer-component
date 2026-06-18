import type { TIcon } from "./IWeather";

export interface ICard {
    type?:string
    result?:string | number;
    iconType?:TIcon
}

