import { Link } from "react-router-dom";

const PublicHeaderButton = () => {
    return (
        <Link to="/login">
            <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-serif">
                ВХІД
            </button>
        </Link>
    );
};

export default PublicHeaderButton;
