import { useState, useEffect } from "react";
import ThemeContext from "../contexts/ThemeContext.js";
import { darkTheme, lightTheme } from "../theme/theme.js";


// Übergeordnete Provider-Komponente, die das Theme an alle Kindkomponenten weitergibt
export default function Contexts({ children }) {

    // Zustand für das aktuelle Theme – startet mit dem hellen Theme
    const [theme, setTheme] = useState(lightTheme);

    // Setzt das Theme-Attribut am HTML-Element beim ersten Laden der Seite
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme.name);
    }, []);

    // Wechselt zwischen hellem und dunklem Theme
    function toggleTheme() {

        setTheme(prev => {
            // Bestimmt das neue Theme anhand des aktuellen
            const newTheme =
                prev.name === "light" ? darkTheme : lightTheme;

            // Aktualisiert das data-theme Attribut am HTML-Element für CSS-Variablen
            document.documentElement.setAttribute(
                "data-theme",
                newTheme.name
            );

            return newTheme;
        });
    }

    return (
        // Stellt Theme und Umschalt-Funktion für alle Kindkomponenten bereit
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}