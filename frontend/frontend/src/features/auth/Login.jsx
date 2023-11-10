import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const residentRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = usePersist();
    const roles = useAuth();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        residentRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({
                username,
                password,
            }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername("");
            setPassword("");
            if (roles.status === "Resident") {
                navigate("/personal/my-appeals");
            } else {
                navigate("/personal/residents-list");
            }
        } catch (err) {
            if (!err.status) {
                setErrMsg("No Server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleResidentInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? "bg-red-500" : "";

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">
                    {errMsg}
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Нік користувача:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={residentRef}
                        value={username}
                        onChange={handleResidentInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Пароль:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                    <button className="form__submit-button">Увійти</button>
                </form>
            </main>
            <footer>
                <Link to="/">На головну</Link>
            </footer>
        </section>
    );

    return content;
};

export default Login;
