import { useState, useEffect } from "react";
import {
    useUpdateResidentMutation,
    useDeleteResidentMutation,
} from "./residentsApiSlice";
import { useNavigate, Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z]{2,20}\d{3,4}$/;

const EditResidentForm = ({ resident }) => {
    const [updateResident, { isLoading, isSuccess, isError, error }] =
        useUpdateResidentMutation();

    const [
        deleteResident,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteResidentMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(resident.username);
    const [validUsername, setValidUsername] = useState(false);
    const [residentName, setResidentName] = useState(resident.residentName);
    const [residentSurname, setResidentSurname] = useState(
        resident.residentSurname
    );
    const [currentDebt, setCurrentDebt] = useState(resident.currentDebt);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername("");
            setResidentName("");
            setResidentSurname("");
            setCurrentDebt("");
            navigate("/personal/residents-list");
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);

    const onSaveResidentClicked = async (e) => {
        await updateResident({
            id: resident.id,
            username,
            residentName,
            residentSurname,
            currentDebt,
        });
        if (isSuccess) {
            navigate("/personal/residents-list");
        }
    };
    console.log(isSuccess);

    const onDeleteResidentClicked = async () => {
        await deleteResident({ id: resident.id });
        navigate("/personal/residents-list");
    };

    const canSave =
        [validUsername, residentName, residentSurname, currentDebt].every(
            Boolean
        ) && !isLoading;

    const errClass = isError ? "bg-red-500" : "";
    const validResidentClass = !validUsername ? "bg-red-500" : "";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center font-montserrat">
            <p className={errClass}>{errContent}</p>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col justify-center"
            >
                <div>
                    <h2 className="text-xl mb-3">
                        Змінити інформацію про мешканця
                    </h2>
                </div>
                <label htmlFor="username" className=" my-2">
                    Нік мешканця <span>[3-20 символів]:</span>
                </label>
                <input
                    className={`${validResidentClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label htmlFor="residentName" className=" my-2">
                    Ім'я мешканця:
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="residentName"
                    name="residentName"
                    type="text"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                />

                <label htmlFor="residentSurname" className=" my-2">
                    Прізвище мешканця:
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="residentSurname"
                    name="residentSurname"
                    type="text"
                    value={residentSurname}
                    onChange={(e) => setResidentSurname(e.target.value)}
                />

                <label htmlFor="currentDebt" className=" my-2">
                    Поточний борг:
                </label>
                <input
                    className={` h-10 bg-yellow-100 rounded-lg px-4`}
                    id="currentDebt"
                    name="currentDebt"
                    type="text"
                    value={currentDebt}
                    onChange={(e) => setCurrentDebt(e.target.value)}
                />

                <div className="flex flex-row gap-6 mt-3">
                    <button
                        title="Зберегти"
                        disabled={!canSave}
                        onClick={onSaveResidentClicked}
                        className="bg-yellow-400 p-3 rounded-md"
                    >
                        Зберегти
                    </button>

                    <button
                        title="Видалити"
                        onClick={onDeleteResidentClicked}
                        className="bg-yellow-400 p-3 rounded-md"
                    >
                        Видалити
                    </button>
                    <Link
                        to=".."
                        title="Назад"
                        className="bg-yellow-400 p-3 rounded-md"
                    >
                        Назад
                    </Link>
                </div>
            </form>
        </main>
    );

    return content;
};

export default EditResidentForm;
