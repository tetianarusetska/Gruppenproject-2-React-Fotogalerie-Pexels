import { useContext } from "react";
import ThemeContext from "../contexts/ModeContext.js";

import lightIcon from "../assets/icons/dark.svg";
import darkIcon from "../assets/icons/light.svg";


// Theme-Schaltfläche zum Wechseln zwischen Hell- und Dunkel-Modus
export default function ThemeButton() {

    // Liest das aktuelle Theme und die Umschalt-Funktion aus dem Context
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 inline-flex items-center justify-center shrink-0 overflow-hidden"
        >
            <img
                //Zeigt je nach aktivem Theme das passende Icon an 
                src={theme.name === "light" ? darkIcon : lightIcon} 
                alt="theme icon"
                className="w-6 h-6 block object-contain"
                style={{ width: '31px', height: '31px', maxWidth: '31px', maxHeight: '31px' }}
            />
        </button>
    );
}