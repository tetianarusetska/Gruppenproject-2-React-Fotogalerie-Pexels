import { createContext } from "react";
import { lightTheme } from "../theme/theme.js";

// Erstellt den ThemeContext mit dem hellen Theme als Standardwert
const ThemeContext = createContext(lightTheme); 

export default ThemeContext;