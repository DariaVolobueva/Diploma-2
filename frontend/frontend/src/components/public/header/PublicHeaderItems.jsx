import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const PublicHeaderItems = () => {
    const links = [
        {
            name: "Діяльність",
            submenu: [
                { name: "Документація", link: "/documents" },
                { name: "Звіти правління", link: "/report" },
                { name: "Кошторис", link: "/estimate" },
                { name: "Боржники", link: "/debtors" },
            ],
        },
        {
            name: "Про ОСББ",
            submenu: [
                { name: "Новини", link: "/news" },
                { name: "Правління", link: "/rule" },
                { name: "Рішення ЗЗУ", link: "/decision" },
                { name: "Тарифи", link: "/tariffs" },
            ],
        },
    ];

    const [heading, setHeading] = useState("");

    return (
        <>
            {links.map((link) => {
                return (
                    <div key={link.name}>
                        <div className="px-3 text-left md:cursor-pointer group">
                            <h1
                                className="py-7 flex justify-between items-center md:pr-0 pr-5 "
                                onClick={() =>
                                    heading !== link.name
                                        ? setHeading(link.name)
                                        : setHeading("")
                                }
                            >
                                {link.name}
                                <span className="text-xl md:mt-1 md:ml-2 inline">
                                    {heading === link.name ? (
                                        <IoIosArrowUp></IoIosArrowUp>
                                    ) : (
                                        <IoIosArrowDown></IoIosArrowDown>
                                    )}
                                </span>
                            </h1>
                            {
                                <div>
                                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-white p-3.5 ">
                                            {link.submenu.map((submenus) => (
                                                <li
                                                    className="text-sm text-gray-600 my-2.5"
                                                    key={submenus.name}
                                                >
                                                    <Link
                                                        to={submenus.link}
                                                        className="hover:text-yellow-400"
                                                    >
                                                        {submenus.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {/* Mobile menu */}
                        <div
                            className={`
                            ${heading === link.name ? "md:hidden" : "hidden"}`}
                        >
                            {link.submenu.map((submenus) => (
                                <div key={submenus.name}>
                                    <li className="py-4 pl-7 font-semibold md:pr-0 pr-5">
                                        <Link to={submenus.link}>
                                            {submenus.name}
                                        </Link>
                                    </li>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PublicHeaderItems;
