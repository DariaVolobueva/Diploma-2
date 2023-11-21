import React from "react";
import { Link, NavLink } from "react-router-dom";

import { SlPeople, SlEnvolope, SlBell } from "react-icons/sl";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineHowToVote } from "react-icons/md";
import { BiCoin } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
    const { username, isHead } = useAuth();
    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    let links;

    links = [
        {
            title: "Мешканці",
            links: [
                {
                    name: "Список мешканців",
                    icon: <SlPeople />,
                    page: "residents-list",
                },
                {
                    name: "звернення мешканців",
                    icon: <SlEnvolope />,
                    page: "residents-appeals",
                },
            ],
        },

        {
            title: "Робота зі сторінкою",
            links: [
                {
                    name: "керування оголошеннями",
                    icon: <SlBell />,
                    page: "add-announcement",
                },
                {
                    name: "керування новинами",
                    icon: <BsNewspaper />,
                    page: "news",
                },
                {
                    name: "керування голосуваннями",
                    icon: <MdOutlineHowToVote />,
                    page: "voting",
                },
            ],
        },
    ];

    if (!isHead) {
        links = [
            {
                title: "",
                links: [
                    {
                        name: "написати звернення",
                        icon: <SlEnvolope />,
                        page: "my-appeals",
                    },
                    {
                        name: "подивитися нарахування",
                        icon: <BiCoin />,
                        page: "accrual",
                    },
                    {
                        name: "проголосувати",
                        icon: <MdOutlineHowToVote />,
                        page: "my-voting",
                    },
                ],
            },
        ];
    }

    const activeLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-black  text-md m-2 hover:text-white";

    return (
        <>
            {activeMenu && (
                <div className=" h-screen overflow-hidden scroll-smooth  md:hover:overflow-auto pb-10 bg-amber-300 border-r-2 border-amber-400 font-montserrat">
                    <div className="flex justify-between items-center ">
                        <Link
                            to="/"
                            className="items-center justify-center flex "
                        >
                            <img
                                src="../src/assets/images/logo.svg"
                                className="w-2/5"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="mt-5 ">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-black m-3 mt-4 uppercase ">
                                    {item.title}
                                </p>
                                {item.links.map((link) => (
                                    <Link
                                        to={`/personal/${link.page}`}
                                        key={link.name}
                                        className={`${activeLink} border-t border-b border-yellow-400`}
                                    >
                                        {link.icon}
                                        <span className="capitalize ">
                                            {link.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
