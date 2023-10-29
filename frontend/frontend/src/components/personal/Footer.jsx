import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHomeClicked = () => navigate("/");

    let goHomeButton = null;
    if (pathname !== "/") {
        goHomeButton = (
            <button
                className="personal-footer-button"
                title="Home"
                onClick={onGoHomeClicked}
            ></button>
        );
    }

    const content = (
        <footer className="personal-footer">
            <p>Current user</p>
            <p>Go home:</p>
            {goHomeButton}
        </footer>
    );
    return content;
}

export default Footer;
