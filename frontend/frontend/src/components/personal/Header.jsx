import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const Header = ({ activeMenu, setActiveMenu }) => {
    const navigate = useNavigate();

    const [sendLogout, { isLoading, isSuccess, isError, error }] =
        useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    const onLogoutClicked = () => sendLogout();

    if (isLoading) return <p>Logging Out...</p>;

    if (isError) return <p>Error: {error.data?.message}</p>;
    const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const today = new Intl.DateTimeFormat("uk-UA", options)
        .format(date)
        .toUpperCase();

    const content = (
        <header className="bg-yellow-400 fixed w-full h-11 flex flex-row items-center justify-between">
            {activeMenu ? (
                <GiCancel
                    size={20}
                    className={activeMenu ? "ml-80" : "ml-4"}
                    onClick={() => setActiveMenu(!activeMenu)}
                ></GiCancel>
            ) : (
                <GiHamburgerMenu
                    size={20}
                    className={activeMenu ? "ml-80" : "ml-4"}
                    onClick={() => setActiveMenu(!activeMenu)}
                ></GiHamburgerMenu>
            )}
            <p>Сьогодні - {today}</p>
            <button className="mr-3" title="Вийти" onClick={onLogoutClicked}>
                <RiLogoutBoxRLine></RiLogoutBoxRLine>
            </button>
        </header>
    );

    return content;
};

export default Header;
