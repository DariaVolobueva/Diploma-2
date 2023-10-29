import logo from "./../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import PublicHeaderItems from "./PublicHeaderItems.jsx";
import PublicHeaderButton from "./PublicHeaderButton";

const PublicHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white sticky top-0 z-10">
            <div className="flex items-center font-medium justify-around ">
                <div className="z-50 md:w-auto w-full flex justify-between">
                    <img
                        src={logo}
                        alt="logo"
                        className="md:cursor-pointer h-24"
                    />
                    <div
                        className="text-3xl md:hidden self-center p-3"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <IoIosClose></IoIosClose>
                        ) : (
                            <IoIosMenu></IoIosMenu>
                        )}
                    </div>
                </div>
                <ul className="md:flex hidden uppercase items-center gap-8 font-serif">
                    <li>
                        <Link to="/" className="py-7 px-3 inline-block">
                            Головна
                        </Link>
                    </li>
                    <PublicHeaderItems></PublicHeaderItems>
                    <li>
                        <Link to="/contacts" className="py-7 px-3 inline-block">
                            Контакти
                        </Link>
                    </li>
                </ul>
                <div className="md:block hidden">
                    <PublicHeaderButton></PublicHeaderButton>
                </div>
                {/*Mobile nav*/}
                <ul
                    className={`md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 font-serif ${
                        open ? "left-0" : "left-[-100%]"
                    }`}
                >
                    <li>
                        <Link to="/main" className="py-7 px-3 inline-block">
                            Головна
                        </Link>
                    </li>
                    <PublicHeaderItems></PublicHeaderItems>
                    <li>
                        <Link to="/contact" className="py-7 px-3 inline-block">
                            Контакти
                        </Link>
                    </li>
                    <div className="py-5">
                        <PublicHeaderButton></PublicHeaderButton>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default PublicHeader;
