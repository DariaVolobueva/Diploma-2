import React from "react";

const Main = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    return (
        <>
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />
                </div>
            )}
        </>
    );
};

export default Main;
