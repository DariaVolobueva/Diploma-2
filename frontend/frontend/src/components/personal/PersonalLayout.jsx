import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const PersonalLayout = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <>
            <Header
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            ></Header>
            <div className="flex flex-row">
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />
                </div>
                <Outlet context={[activeMenu]}></Outlet>
            </div>
        </>
    );
};

export default PersonalLayout;
