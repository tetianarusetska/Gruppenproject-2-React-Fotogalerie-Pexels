import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";

import lightIcon from "../assets/icons/dark.svg";
import darkIcon from "../assets/icons/light.svg";

export default function ThemeButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 inline-flex items-center justify-center shrink-0"
        >
            <img
                src={theme.name === "light" ? darkIcon : lightIcon}
                alt="theme icon"
                className="w-6 h-6 block"
            />
        </button>
    );
}