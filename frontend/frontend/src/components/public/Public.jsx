import { Outlet } from "react-router-dom";
import PublicHeader from "./header/PublicHeader";
import PublicFooter from "./footer/PublicFooter";

const Public = () => {
    const content = (
        <>
            <PublicHeader></PublicHeader>
            <Outlet></Outlet>
            <PublicFooter></PublicFooter>
        </>
    );

    return content;
};

export default Public;
