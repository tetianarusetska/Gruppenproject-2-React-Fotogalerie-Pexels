import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";

import lightIcon from "../assets/icons/dark.svg";
import darkIcon from "../assets/icons/light.svg";

export default function ThemeButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
       <button
    onClick={toggleTheme}
    className="w-10 h-10 inline-flex items-center justify-center bg-red-500"
    style={{ flexShrink: 0 }}
>
    <img
        src={theme.name === "light" ? darkIcon : lightIcon}
        alt="theme icon"
        style={{ width: "24px", height: "24px", display: "block" }}
    />
</button>
    );
}