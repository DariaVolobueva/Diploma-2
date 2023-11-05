import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PublicHeaderButton = () => {
    const { username } = useAuth();
    let content;
    if (username) {
        content = (
            <Link to="/personal/residents-list">
                <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-serif">
                    ПЕРЕЙТИ ДО КАБІНЕТУ
                </button>
            </Link>
        );
    } else {
        content = (
            <Link to="/login">
                <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-serif">
                    ВХІД
                </button>
            </Link>
        );
    }
    return content;
};

export default PublicHeaderButton;
