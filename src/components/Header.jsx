import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import ThemedButton from "./ThemedButton.jsx"
import HeaderSearch from "./HeaderSearch.jsx";


export default function Header() {
    const links = [
        { target: "/", displayName: "Home" },
        { target: "/favorites", displayName: "Favorites" },
    ]

    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {

        function handleScroll() {

            const halfWindowHeight =
                window.innerHeight / 2;

            setShowSearch(
                window.scrollY > halfWindowHeight
            );
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (
        <header className="sticky top-0 z-50"
            style={{
                backgroundColor: "var(--bgColor)",
                color: "var(--mainColor)",
            }}
        >
            <nav className="flex items-center gap-4 pt-4 pb-4 pl-6 pr-8 bg-transparent">
                {links.map((link, index) => (
                    <NavLink
                        key={link.target}
                        to={link.target}
                        end={link.target === "/"}
                        className={({ isActive }) => `
                            px-4 py-2 rounded-md transition-colors
                            ${isActive
                                ? "font-semibold"
                                : "hover:bg-neutral-200 hover:text-black"
                            }
                        `}
                    >
                        {link.displayName}


                    </NavLink>

                ))}
                {/* header search */}

                <div className="flex-1 flex justify-center">

                    {showSearch && (
                        <div className="w-full max-w-md mx-6">
                            <HeaderSearch />
                        </div>


                    )}

                </div>

                {/* right side buttons */}
                <div className="relative group ml-auto flex items-center gap-3">



                    {/* profile button */}
                    <NavLink
                        to="/favorites"
                        className="
                            p-2 rounded-full
                             hover:bg-neutral-200
                            transition-colors
                            flex items-center justify-center
                                "
                    >
                        <CgProfile
                            size={34}
                            style={{
                                color: "var(--mainColor)",
                            }}
                        />
                    </NavLink>


                    {/* dropdown menu */}
                    <div
                        className="
                            absolute right-0 top-12
                             w-40
                    
                            rounded-xl
                            border border-neutral-200
                            overflow-hidden

                            opacity-0 invisible
                            group-hover:opacity-100
                            group-hover:visible

                            transition-all duration-200
                            z-50
                            "
                        style={{
                            backgroundColor: "var(--bgColor)",
                            color: "var(--mainColor)",
                        }}
                    >

                        <NavLink
                            to="/favorites"
                            className="
                                text-[var(--mainColor)]

                                block
                                px-4 py-2
                                 hover:bg-neutral-100 hover:text-black
                                "
                        >
                            Profile
                        </NavLink>


                        <button className="block w-full px-4 py-3 text-left hover:bg-neutral-100 hover:text-black">
                            Settings
                        </button>

                        <button className="block w-full px-4 py-3 text-left hover:bg-neutral-100 hover:text-black">
                            Logout
                        </button>
                        <div className="
                            w-6 h-6 p-4 m-3
                            rounded-full
                             hover:bg-neutral-200
                            transition-colors
                            flex items-center justify-center
                            ">
                            <ThemedButton />
                        </div>
                    </div>



                </div>

                <NavLink
                    to="/registration"
                    className="
                        text-[18px]
                        px-4 py-2 rounded-md
                        transition-colors
                        "
                    style={{
                        backgroundColor: "var(--mainColor)",
                        color: "var(--bgColor)",
                    }}
                >
                    Register
                </NavLink>

            </nav>
        </header>
    );
}
