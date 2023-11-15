import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewAppealMutation } from "./appealsApiSlice";
import { selectResidentById } from "./../residents/residentsApiSlice";
import AppealsOptions from "./AppealsOptions";

const NewAppealForm = ({ id }) => {
    const [addNewAppeal, { isLoading, isSuccess, isError, error }] =
        useAddNewAppealMutation();

    const navigate = useNavigate();

    const [text, setText] = useState("");

    useEffect(() => {
        if (isSuccess) {
            setText("");
            navigate("/personal/my-appeals");
        }
    }, [isSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);

    const canSave = [text].every(Boolean) && !isLoading;

    const onSaveAppealClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewAppeal({ user: id, text });
        }
    };

    const errClass = isError ? "bg-red-500" : "";
    const validTextClass = !text ? "bg-red-500" : "";

    const content = (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center font-serif">
            <p className={errClass}>{error?.data?.message}</p>

            <form
                className="flex flex-col justify-center"
                onSubmit={onSaveAppealClicked}
            >
                <div>
                    <h2 className="text-xl">Нова заявка</h2>
                </div>

                <label className=" my-2" htmlFor="text">
                    Текст:
                </label>
                <textarea
                    className={`${validTextClass} h-30 py-3 bg-yellow-100 rounded-lg px-4`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <div className="mt-3">
                    <button
                        className="bg-yellow-400 p-3 rounded-md"
                        title="Save"
                        disabled={!canSave}
                    >
                        Відправити
                    </button>
                </div>
            </form>
        </main>
    );

    return content;
};

export default NewAppealForm;
