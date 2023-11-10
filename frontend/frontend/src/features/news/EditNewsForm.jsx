import { useState, useEffect } from "react";
import { useUpdateNewsMutation, useDeleteNewsMutation } from "./newsApiSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const EditNewsForm = ({ news }) => {
    const [updateNews, { isLoading, isSuccess, isError, error }] =
        useUpdateNewsMutation();

    const [
        deleteNews,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteNewsMutation();

    const navigate = useNavigate();
    const [text, setText] = useState(news.text);
    const [title, setTitle] = useState(news.title);
    const [image, setImage] = useState(news.img);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setText("");
            setTitle("");
            navigate("/personal/news");
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onImageChanged = (e) => setImage(e.target.files[0]);

    const canSave = [text, title].every(Boolean) && !isLoading;

    const submitImage = async (e) => {
        e.preventDefault();

        await updateNews({
            id: news.id,
            extra: e.target,
        });
    };

    const onDeleteNewsClicked = async () => {
        await deleteNews({ id: news.id });
    };

    const errClass = isError || isDelError ? "bg-red-500" : "";
    const validTextClass = !text ? "bg-red-500" : "";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <main className="my-14 w-full flex flex-col items-center justify-center">
            <p className={errClass}>{errContent}</p>

            <form
                className="flex flex-col justify-center"
                onSubmit={(e) => submitImage(e)}
                encType="multipart/form-data"
            >
                <div className="text-xl mb-3">
                    <h2>Редагувати новину</h2>
                </div>

                <label className=" my-2" htmlFor="news-title">
                    Назва:
                </label>
                <input
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="news-title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className=" my-2" htmlFor="news-text">
                    Tекст:
                </label>
                <textarea
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="news-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className=" my-2" htmlFor="news-image">
                    Зображення:
                </label>
                <input
                    className={`${validTextClass} h-10 bg-yellow-100 rounded-lg px-4`}
                    id="news-image"
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
                    <button
                        className="bg-yellow-400 p-3 rounded-md"
                        title="Delete"
                        onClick={onDeleteNewsClicked}
                    >
                        Видалити
                    </button>
                </div>
            </form>
        </main>
    );

    return content;
};

export default EditNewsForm;
