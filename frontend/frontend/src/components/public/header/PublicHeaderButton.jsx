import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PublicHeaderButton = () => {
    const { username, roles } = useAuth();
    const link =
        roles.status === "Resident"
            ? "/personal/residents-list"
            : "/personal/my-appeals";
    let content;
    if (username) {
        content = (
            <Link to={link}>
                <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-montserrat">
                    ПЕРЕЙТИ ДО КАБІНЕТУ
                </button>
            </Link>
        );
    } else {
        content = (
            <Link to="/login">
                <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-montserrat">
                    ВХІД
                </button>
            </Link>
        );
    }
    return content;
};

export default PublicHeaderButton;
