import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import img1 from "../assets/images/pexels-1.jpg"
import img2 from "../assets/images/pexels-2.jpg"
import img3 from "../assets/images/pexels-3.jpg"
import img4 from "../assets/images/pexels-4.jpg"
import img5 from "../assets/images/pexels-5.jpg"

const SLIDES = [
    { src: img1, alt: "Pexels Bild 1" },
    { src: img2, alt: "Pexels Bild 2" },
    { src: img3, alt: "Pexels Bild 3" },
    { src: img4, alt: "Pexels Bild 4" },
    { src: img5, alt: "Pexels Bild 5" },
];

// Zeit zwischen automatischen Wechseln (in Millisekunden)
const INTERVAL = 3000;

export default function Carousel() {

    // aktueller aktiver Slide
    const [current, setCurrent] = useState(1);

    // Anzahl der Slides
    const n = SLIDES.length;

    // automatischer Wechsel der Slides
    useEffect(() => {
        const interval = setInterval(() => {
            // nächster Slide (Loop zurück zum Anfang)
            setCurrent(c => (c + 1) % n);
        }, INTERVAL);

        // Cleanup: Interval stoppen wenn Komponente entfernt wird
        return () => clearInterval(interval);
    }, [n]);


    return (
        <div className="flex flex-col items-center py-10 select-none">

            {/* Container für den Slider */}
            <div className="relative w-full flex items-center justify-center h-[460px]">

                {SLIDES.map((slide, i) => {

                    // Abstand vom aktuellen Slide
                    const diff = i - current;

                    // Korrigiert den Abstand für den "Loop-Effekt"
                    const rel =
                        diff > n / 2 ? diff - n :
                            diff < -n / 2 ? diff + n :
                                diff;

                    // absoluter Abstand (für Größe/Transparenz)
                    const abs = Math.abs(rel);

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-[280px] h-[380px] rounded-md overflow-hidden"

                            // Animation für Position, Größe und Sichtbarkeit
                            animate={{
                                x: rel * 220, // horizontale Position
                                scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.62, // Größe
                                opacity: abs === 0 ? 1 : abs === 1 ? 0.75 : 0.45, // Transparenz
                                zIndex: abs === 0 ? 10 : abs === 1 ? 6 : 2, // Reihenfolge
                            }}

                            // Animationsdauer und easing
                            transition={{
                                duration: 0.55,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigationspunkte (Dots) */}
            <div className="flex gap-2 mt-7">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${i === current
                            ? "w-[9px] h-[9px] bg-gray-900 scale-125"
                            : "w-[7px] h-[7px] bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}