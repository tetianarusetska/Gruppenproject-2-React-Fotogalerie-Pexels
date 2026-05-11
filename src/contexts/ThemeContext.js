import { createContext } from "react";
import { lightTheme } from "../theme/theme.js";

const ThemeContext = createContext(lightTheme);

export default ThemeContext;