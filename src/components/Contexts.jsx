import { useState, useEffect } from "react";
import ThemeContext from "../contexts/ThemeContext.js";
import { darkTheme, lightTheme } from "../theme/theme.js";

export default function Contexts({ children }) {
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme.name);
    }, []);

    function toggleTheme() {
        setTheme(prev => {
            const newTheme =
                prev.name === "light" ? darkTheme : lightTheme;

            document.documentElement.setAttribute(
                "data-theme",
                newTheme.name
            );

            return newTheme;
        });
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}