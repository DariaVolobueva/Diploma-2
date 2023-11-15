import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

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
    const { roles } = useAuth();

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
            if (roles.includes("Resident")) {
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

    const errClass = errMsg ? "bg-red-500 p-3" : "";

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const content = (
        <main className="flex justify-center items-center w-screen h-screen">
            <section className="bg-yellow-400 flex-col py-9 px-7 rounded-xl">
                <header>
                    <h1 className="uppercase text-2xl text-center">Увійти</h1>
                </header>
                <main className="flex flex-col">
                    <p ref={errRef} className={errClass} aria-live="assertive">
                        {errMsg}
                    </p>

                    <form
                        className="flex flex-col mt-5"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="username" className="text-xl mb-3">
                            Логін:
                        </label>
                        <input
                            className="bg-yellow-50 h-8 rounded-lg px-2"
                            type="text"
                            id="username"
                            ref={residentRef}
                            value={username}
                            onChange={handleResidentInput}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password" className="text-xl mb-3 mt-3">
                            Пароль:
                        </label>
                        <input
                            className="bg-yellow-50 h-8 rounded-lg px-2"
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                        <div className="mt-3 flex flex-row gap-3 items-center">
                            <input
                                type="checkbox"
                                className="accent-yellow-700 w-4 h-4"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            <label htmlFor="persist" className="text-lg">
                                Запам'ятати мене
                            </label>
                        </div>
                        <button className="text-xl uppercase my-3">
                            Увійти
                        </button>
                    </form>
                </main>
                <footer className="flex flex-row items-center">
                    <BiArrowBack></BiArrowBack>
                    <Link to="/">На головну</Link>
                </footer>
            </section>
        </main>
    );

    return content;
};

export default Login;
