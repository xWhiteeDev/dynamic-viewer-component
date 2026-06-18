import { createContext } from "react";
import type { INotify } from "../interfaces/INotify";

export const AppContext = createContext<((args: INotify) => void) | undefined>(undefined);