import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import ThemedButton from "./ThemedButton.jsx"


export default function Header() {
    const links = [
        { target: "/", displayName: "Home" },
        { target: "/favorites", displayName: "Favorites" },
    ]

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
                                : "hover:bg-gray-200 hover:text-black"
                            }
                        `}
                    >
                        {link.displayName}


                    </NavLink>

                ))}


                {/* right side buttons */}
                <div className="relative group ml-auto flex items-center gap-3">

                    <ThemedButton />

                    {/* profile button */}
                    <NavLink
                        to="/favorites"
                        className="
                            p-2 rounded-full
                             hover:bg-gray-200
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
                            border border-gray-200
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
                                block
                                px-4 py-2
                                 hover:bg-gray-100
                                "
                        >
                            Profile
                        </NavLink>


                        <button className="block w-full px-4 py-3 text-left hover:bg-gray-100">
                            Settings
                        </button>

                        <button className="block w-full px-4 py-3 text-left hover:bg-gray-100">
                            Logout
                        </button>
                    </div>



                </div>



                {/* register button */}
                <NavLink
                    to="/register"
                    className="
                            bg-black text-white
                            text-[18px]
                            px-4 py-2 rounded-md
                            hover:bg-gray-800
                            transition-colors
                        "
                >
                    Register
                </NavLink>

            </nav>
        </header>
    );
}
