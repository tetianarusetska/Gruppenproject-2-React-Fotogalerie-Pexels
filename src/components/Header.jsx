import { NavLink } from "react-router-dom";


export default function Header() {
    const links = [
        { target: "/", displayName: "Home" },
        { target: "/favorites", displayName: "Favorites" },


    ]

    return (
        <header className="z-50">
            <nav className="flex items-center gap-4 p-4 bg-transparent">
                {links.map((link, index) => (
                    <NavLink
                        key={link.target}
                        to={link.target}
                        end={link.target === "/"}
                        className={({ isActive }) => `
                        ${index === 0 ? "font-montserrat font-medium" : ""}
                        px-4 py-2 rounded-md
                            ${isActive
                                ? "bg-black text-white cursor-default"
                                :  "hover:bg-gray-200"
                            }
    `}
                    >
                        {link.displayName}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}