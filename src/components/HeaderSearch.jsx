import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearch } from "../providers/SearchProvider.jsx";

export default function HeaderSearch() {

    const [search, setSearch] = useState("");

    const { neueSucheStarten } = useSearch();

    function handleSubmit(event) {

        event.preventDefault();

        if (!search.trim()) {
            return;
        }

        neueSucheStarten(search.trim());

        setSearch("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md"
        >

            <input
                type="text"
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
                placeholder="Search..."
                className="
                    w-full text-black
                    rounded-lg
                    bg-neutral-100
                    px-5 py-2 pr-12
                    outline-none
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
                    hover:bg-neutral-300
                "
            >
                <LuSearch size={18} />
            </button>

        </form>
    );
}