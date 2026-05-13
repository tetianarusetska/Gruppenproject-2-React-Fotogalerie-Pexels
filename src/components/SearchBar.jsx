import { BsSearch } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";

export default function SearchBar({
    suchEingabe,
    setSuchEingabe,
    sucheAbsenden,
    farbe,
    land,
    farben,
    laenderOptionen,
    neueSucheStarten,
    query,
    kategorien,
}) {

    return (
        <div className="flex flex-col items-center gap-4 p-6 pt-10">

            <form
                onSubmit={sucheAbsenden}
                className="relative w-full max-w-xl"
            >

                <input
                    type="text"
                    value={suchEingabe}
                    onChange={(event) =>
                        setSuchEingabe(event.target.value)
                    }
                    placeholder="Search..."
                    className="
                        w-full text-black
                        rounded-lg
                        bg-neutral-100
                        px-5 py-3 pr-14
                        outline-none
                        focus:border-black
                    "
                />

                <button
                    type="submit"
                    className="
                        absolute top-0 right-0
                        h-full px-4
                        bg-neutral-200
                        text-black
                        rounded-r-lg

                        transition-all duration-200
                        hover:brightness-90
                    "
                >
                    <LuSearch size={20} />
                </button>

            </form>

            <div className="flex flex-wrap justify-center gap-3 pt-8">

                <select
                    className="
                        rounded-lg border border-neutral-300
                        px-4 py-2 bg-white text-black text-sm outline-black
                    "
                    value={farbe}
                    onChange={(e) =>
                        neueSucheStarten(query, e.target.value, land)
                    }
                >
                    <option value="">All Colors</option>

                    {farben.map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </select>

                <select
                    className="
                        rounded-lg border border-neutral-300
                        px-4 py-2 bg-white text-black text-sm outline-black
                    "
                    value={land}
                    onChange={(e) =>
                        neueSucheStarten(query, farbe, e.target.value)
                    }
                >
                    <option value="">All Regions</option>

                    {laenderOptionen.map((l) => (
                        <option key={l.code} value={l.code}>
                            {l.name}
                        </option>
                    ))}
                </select>

            </div>

            <div className="flex flex-wrap justify-center gap-3">

                {kategorien.map((kategorie) => (
                    <button
                        key={kategorie}
                        type="button"
                        onClick={() =>
                            neueSucheStarten(kategorie)
                        }
                        className={
                            query === kategorie
                                ? "px-4 py-2 rounded-lg bg-black text-white"
                                : "px-4 py-2 rounded-lg bg-neutral-200 text-black hover:bg-neutral-300"
                        }
                    >
                        {kategorie}
                    </button>
                ))}

            </div>

        </div>
    );
}