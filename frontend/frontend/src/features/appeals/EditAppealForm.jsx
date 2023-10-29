import { useState, useEffect } from "react";
import {
    useUpdateAppealMutation,
    useDeleteAppealMutation,
} from "./appealsApiSlice";
import { useNavigate } from "react-router-dom";

const EditAppealForm = ({ appeal, residents }) => {
    const [updateAppeal, { isLoading, isSuccess, isError, error }] =
        useUpdateAppealMutation();

    const [
        deleteAppeal,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteAppealMutation();

    const navigate = useNavigate();
    const [text, setText] = useState(appeal.text);
    const [status, setStatus] = useState(appeal.status);
    const [userId, setUserId] = useState(appeal.user);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setText("");
            setUserId("");
            navigate("/personal/residents-appeals");
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);
    const onStatusChanged = (e) => setStatus(e.target.value);
    const onUserIdChanged = (e) => setUserId(e.target.value);

    const canSave = [text, userId].every(Boolean) && !isLoading;

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

    const options = residents.map((user) => {
        return (
            <option key={user.id} value={user.id}>
                {" "}
                {user.username}
            </option>
        );
    });

    const errClass = isError || isDelError ? "errmsg" : "offscreen";
    const validTextClass = !text ? "form__input--incomplete" : "";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <main className="my-14 w-full flex flex-col items-center justify-center">
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Appeal #{appeal.ticket}</h2>
                </div>

                <label className="form__label" htmlFor="appeal-text">
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="appeal-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <fieldset>
                            <legend>Поточний статус:</legend>

                            <div>
                                <input
                                    type="radio"
                                    id="open"
                                    name="open"
                                    value="Open"
                                    onChange={onStatusChanged}
                                    checked={status === "Open" ? true : false}
                                />
                                <label for="open">На розгляді</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="inProgress"
                                    name="inProgress"
                                    value="InProgress"
                                    onChange={onStatusChanged}
                                    checked={
                                        status === "InProgress" ? true : false
                                    }
                                />
                                <label for="inProgress">В процесі</label>
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
                                <label for="closed">Завершено</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="declined"
                                    name="declined"
                                    value="Declined"
                                    onChange={onStatusChanged}
                                    checked={
                                        status === "Declined" ? true : false
                                    }
                                />
                                <label for="declined">Відхилено</label>
                            </div>
                        </fieldset>

                        <label
                            className="form__label form__checkbox-container"
                            htmlFor="appeal-username"
                        >
                            Створено:
                        </label>
                        <select
                            id="appeal-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveAppealClicked}
                                disabled={!canSave}
                            >
                                Save
                            </button>
                            <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteAppealClicked}
                            >
                                Delete
                            </button>
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
