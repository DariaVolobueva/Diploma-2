import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewNewsMutation } from "./newsApiSlice";

const NewNewsForm = () => {
    const [addNewNews, { isLoading, isSuccess, isError, error }] =
        useAddNewNewsMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (isSuccess) {
            setText("");
            setTitle("");
            setImage("");
            navigate("/personal/news");
        }
    }, [isSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onImageChanged = (e) => setImage(e.target.files[0]);

    const canSave = [text, title, image].every(Boolean) && !isLoading;

    const onSubmitNewsClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNews({ extra: e.target });
        }
    };

    const errClass = isError ? "bg-red-500" : "";
    const validTextClass = !text ? "bg-red-500" : "";

    const content = (
        <main className="my-14 w-full flex flex-col items-center justify-center font-montserrat">
            <p className={errClass}>{error?.data?.message}</p>

            <form
                className="flex flex-col justify-center"
                onSubmit={(e) => onSubmitNewsClicked(e)}
            >
                <div className="text-xl mb-3">
                    <h2>Створити новину</h2>
                </div>

                <label className=" my-2" htmlFor="text">
                    Заголовок:
                </label>
                <input
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="title"
                    name="title"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className=" my-2" htmlFor="text">
                    Текст новини:
                </label>
                <textarea
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <label className=" my-2" htmlFor="text">
                    Зображення:
                </label>
                <input
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="image"
                    type="file"
                    name="image"
                    onChange={onImageChanged}
                />

                <div className="flex flex-row gap-6 mt-3">
                    <button
                        className="bg-yellow-400 p-3 rounded-md"
                        title="Save"
                        disabled={!canSave}
                    >
                        Зберегти
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

export default NewNewsForm;
