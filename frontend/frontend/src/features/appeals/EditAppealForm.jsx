import { useState, useEffect } from "react";
import {
    useUpdateAppealMutation,
    useDeleteAppealMutation,
} from "./appealsApiSlice";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditAppealForm = ({ appeal, residents }) => {
    const [updateAppeal, { isLoading, isSuccess, isError, error }] =
        useUpdateAppealMutation();

    const [
        deleteAppeal,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteAppealMutation();

    const navigate = useNavigate();
    const { roles } = useAuth();
    const [text, setText] = useState(appeal.text);
    const [status, setStatus] = useState(appeal.status);
    const userId = appeal.user;

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setText("");
            if (roles.includes("Head")) {
                navigate("/personal/residents-appeals");
            } else {
                navigate("/personal/my-appeals");
            }
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);
    const onStatusChanged = (e) => setStatus(e.target.value);

    const canSave = [text].every(Boolean) && !isLoading;

    const onSaveAppealClicked = async (e) => {
        if (canSave) {
            await updateAppeal({
                id: appeal.id,
                user: userId,
                text,
                status,
            });
        }
    };

    const onDeleteAppealClicked = async () => {
        await deleteAppeal({ id: appeal.id });
    };

    // const created = new Date(appeal.createdAt).toLocaleString("uk-UA", {
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    // });
    // const updated = new Date(appeal.updatedAt).toLocaleString("uk-UA", {
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    // });

    const errClass = isError || isDelError ? "errmsg" : "offscreen";
    const validTextClass = !text ? "form__input--incomplete" : "";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    let updateStatus;
    let updateText;
    let deleteButton;

    if (roles.includes("Head")) {
        updateStatus = (
            <fieldset>
                <legend className="text-lg">Поточний статус:</legend>

                <div>
                    <input
                        type="radio"
                        id="open"
                        name="open"
                        value="Open"
                        onChange={onStatusChanged}
                        checked={status === "Open" ? true : false}
                    />
                    <label className=" my-2" htmlFor="open">
                        На розгляді
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="inProgress"
                        name="inProgress"
                        value="InProgress"
                        onChange={onStatusChanged}
                        checked={status === "InProgress" ? true : false}
                    />
                    <label className=" my-2" htmlFor="inProgress">
                        В процесі
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="closed"
                        name="closed"
                        value="Closed"
                        onChange={onStatusChanged}
                        checked={status === "Closed" ? true : false}
                    />
                    <label className=" my-2" htmlFor="closed">
                        Завершено
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="declined"
                        name="declined"
                        value="Declined"
                        onChange={onStatusChanged}
                        checked={status === "Declined" ? true : false}
                    />
                    <label className=" my-2" htmlFor="declined">
                        Відхилено
                    </label>
                </div>
            </fieldset>
        );
        updateText = null;
        deleteButton = null;
    } else {
        updateStatus = null;
        updateText = (
            <>
                <label className=" my-2" htmlFor="appeal-text">
                    Text:
                </label>
                <textarea
                    className={`${validTextClass} h-30 py-3 bg-yellow-100 rounded-lg px-4`}
                    id="appeal-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
            </>
        );
        deleteButton = (
            <button
                className="bg-yellow-400 p-3 rounded-md"
                title="Delete"
                onClick={onDeleteAppealClicked}
            >
                Видалити
            </button>
        );
    }

    const content = (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center font-montserrat">
            <p className={errClass}>{errContent}</p>

            <form
                className="flex flex-col justify-center"
                onSubmit={(e) => e.preventDefault()}
            >
                <div>
                    <h2 className="text-xl mb-3">Редагувати заявку</h2>
                </div>
                {updateText}
                <div className="form__row">
                    <div className="form__divider">
                        {updateStatus}
                        <div className="flex flex-row gap-6 mt-3">
                            <button
                                className="bg-yellow-400 p-3 rounded-md"
                                title="Save"
                                onClick={onSaveAppealClicked}
                                disabled={!canSave}
                            >
                                Зберегти
                            </button>
                            {deleteButton}
                            <Link
                                to=".."
                                title="Назад"
                                className="bg-yellow-400 p-3 rounded-md"
                            >
                                Назад
                            </Link>
                        </div>
                    </div>

                    {/* <div className="form__divider">
                        <p className="form__created">
                            Created:
                            <br />
                            {created}
                        </p>
                        <p className="form__updated">
                            Updated:
                            <br />
                            {updated}
                        </p>
                    </div> */}
                </div>
            </form>
        </main>
    );

    return content;
};

export default EditAppealForm;
