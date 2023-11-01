import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";

const Login = () => {
    const residentRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = usePersist();

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
            navigate("/personal/residents-list");
        } catch (err) {
            if (!err.status) {
                setErrMsg("No Server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.status === 401) {
                setErrMsg("Невірний логін або пароль");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleResidentInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? "bg-red-500 px-3 py-2 mb-2" : "";

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const content = (
        <section className="flex flex-col justify-center items-center h-screen">
            <main className="flex flex-col justify-center items-center bg-yellow-400 py-8 px-6 rounded-xl">
                <p ref={errRef} className={errClass} aria-live="assertive">
                    {errMsg}
                </p>
                <header className="mb-4 text-3xl">
                    <h1>Увійти</h1>
                </header>
                <form className="flex flex-col text-xl" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="mb-3">
                        Логін:
                    </label>
                    <input
                        className="h-8 rounded-lg px-2 mb-3"
                        type="text"
                        id="username"
                        ref={residentRef}
                        value={username}
                        onChange={handleResidentInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password" className="mb-3">
                        Пароль:
                    </label>
                    <input
                        className="h-8 rounded-lg px-2 mb-3"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <div className="flex flex-row items-center gap-3">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                            className="w-5 h-5 accent-yellow-100"
                        />
                        <label htmlFor="persist">Запам'ятати мене</label>
                    </div>

                    <button className="p-5">Увійти</button>
                </form>
                <footer className="text-xl ">
                    <Link
                        to="/"
                        className="flex flex-row gap-3 items-center justify-center"
                    >
                        <BiArrowBack></BiArrowBack>На головну
                    </Link>
                </footer>
            </main>
        </section>
    );

    return content;
};

export default Login;
