import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import img1 from "../assets/images/pexels-1.jpg";
import img2 from "../assets/images/pexels-2.jpg";
import img3 from "../assets/images/pexels-3.jpg";
import img4 from "../assets/images/pexels-4.jpg";
import img5 from "../assets/images/pexels-5.jpg";

export default function Carousel() {

    const images = [img1, img2, img3, img4, img5];

    // State für alle Slides im Carousel
    // Hier werden später neue Bilder hinzugefügt
    const [slides, setSlides] = useState(images);

    // State für den aktuellen aktiven Slide
    const [index, setIndex] = useState(0);

    // useEffect für automatisches Wechseln der Slides
    useEffect(() => {

        // alle 2.5 Sekunden:
        // nächstes Bild anzeigen
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 2500);

        // Cleanup:
        // Interval stoppen wenn Component entfernt wird
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        // Wenn wir fast am Ende der Slides sind
        if (index >= slides.length - 3) {

            // Originalbilder erneut ans Ende anhängen
            // Dadurch entsteht ein Infinite-Loop-Effekt
            setSlides((prev) => [...prev, ...images]);
        }

    }, [index, slides.length, images]);

    return (

        // Äußerer Container
        <div className="w-full flex justify-center overflow-hidden py-10">

            {/* sichtbarer Carousel-Bereich */}
            <div className="w-[1000px] overflow-hidden">

                {/* beweglicher Slider-Track */}
                <motion.div
                    className="flex gap-2"
                    // horizontale Bewegung
                    animate={{
                        x: -(index * 326),
                    }}
                    // Animationseinstellungen
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    {/* Alle Bilder rendern */}
                    {slides.map((img, i) => (

                        <div
                            key={i}
                            className="
                                min-w-[300px]
                                h-[450px]
                                overflow-hidden
                                transition-all
                                duration-200
                            "
                        >
                            {/* Bild */}
                            <img
                                src={img}
                                alt="slide"
                                className="w-full h-full object-cover"
                            />

                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}