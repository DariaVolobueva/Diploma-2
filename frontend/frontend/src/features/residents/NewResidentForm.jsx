import { useState, useEffect } from "react";
import { useAddNewResidentMutation } from "./residentsApiSlice";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z]{2,20}\d{3,4}$/;

const NewResidentForm = () => {
    const [addNewResident, { isLoading, isSuccess, isError, error }] =
        useAddNewResidentMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [residentName, setResidentName] = useState("");
    const [residentSurname, setResidentSurname] = useState("");
    const [currentDebt, setCurrentDebt] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const roles = ["Resident"];

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        if (isSuccess) {
            setUsername("");
            navigate("/personal/residents-list");
        }
    }, [isSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onResidentNameChanged = (e) => setResidentName(e.target.value);
    const onResidentSurnameChanged = (e) => setResidentSurname(e.target.value);
    const onCurrentDebtChanged = (e) => setCurrentDebt(e.target.value);

    const canSave = !!validUsername && !isLoading;

    const onSaveResidentClicked = async (e) => {
        e.preventDefault();
        const password = username;
        console.log(
            username,
            password,
            roles,
            residentName,
            residentSurname,
            currentDebt
        );
        if (canSave) {
            await addNewResident({
                username,
                password,
                roles,
                residentName,
                residentSurname,
                currentDebt,
            });
        }
    };

    const errClass = isError ? "bg-red-500" : "";
    const validResidentClass = !validUsername ? "bg-red-500" : "";

    const content = (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center font-serif">
            <p className={errClass}>{error?.data?.message}</p>

            <form
                onSubmit={onSaveResidentClicked}
                className="flex flex-col justify-center"
            >
                <div>
                    <h2 className="text-xl">Новий мешканець</h2>
                </div>
                <label htmlFor="username" className=" my-2">
                    Нік мешканця: <span>[3-20 символів]</span>
                </label>
                <input
                    className={`${validResidentClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    required
                />

                <label htmlFor="residentName" className=" my-2">
                    Ім'я мешканця: <span>[4-12 символів]</span>
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="residentName"
                    name="residentName"
                    type="text"
                    value={residentName}
                    onChange={onResidentNameChanged}
                    required
                />

                <label htmlFor="residentSurname" className=" my-2">
                    Прізвище мешканця: <span>[4-12 символів]</span>
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="residentSurname"
                    name="residentSurname"
                    type="text"
                    value={residentSurname}
                    onChange={onResidentSurnameChanged}
                    required
                />

                <label htmlFor="currentDebt" className=" my-2">
                    Поточний борг: <span>[4-12 символів]</span>
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="currentDebt"
                    name="currentDebt"
                    type="text"
                    value={currentDebt}
                    onChange={onCurrentDebtChanged}
                    required
                />

                <div className="flex flex-row gap-6 mt-3">
                    <button
                        title="Зберегти"
                        disabled={!canSave}
                        className="bg-yellow-400 p-3 rounded-md"
                    >
                        Зберегти
                    </button>
                </div>
            </form>
        </main>
    );

    return content;
};

export default NewResidentForm;
