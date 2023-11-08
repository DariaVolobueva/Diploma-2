import { useState, useEffect } from "react";
import { useUpdateNewsMutation, useDeleteNewsMutation } from "./newsApiSlice";
import { useNavigate } from "react-router-dom";
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

    const onSaveNewsClicked = async (e) => {
        // const formData = new FormData();
        // formData.append("image", image);
        console.log(image);

        if (canSave && image) {
            await updateNews({
                id: news.id,
                title,
                text,
                img: image.name,
            });
        } else if (canSave) {
            await updateNews({
                id: news.id,
                title,
                text,
            });
        }
    };

    const submitImage = async (e) => {
        e.preventDefault();

        console.log(e.target);

        const formData = new FormData(e.target);
        formData.append("extra", "Extra data");
        console.log(formData);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        await axios
            .post("http://localhost:3500/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(`result: \n ${res}`);
            })
            .catch((err) => console.log(err));

        // await axios.patchForm("http://localhost:3500/upload", {
        //     img: image,
        //     text: text,
        //     title: title,
        // });
    };

    const onDeleteNewsClicked = async () => {
        await deleteNews({ id: news.id });
    };

    const errClass = isError || isDelError ? "errmsg" : "offscreen";
    const validTextClass = !text ? "form__input--incomplete" : "";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <main className="my-14 w-full flex flex-col items-center justify-center">
            <p className={errClass}>{errContent}</p>

            <form
                className="form"
                onSubmit={(e) => submitImage(e)}
                encType="multipart/form-data"
            >
                <div className="form__title-row">
                    <h2>Edit News</h2>
                </div>

                <label className="form__label" htmlFor="news-title">
                    Title:
                </label>
                <input
                    className={`form__input form__input--text ${validTextClass}`}
                    id="news-title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="news-text">
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="news-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label" htmlFor="news-image">
                    Image:
                </label>
                <input
                    className={`form__input form__input--text ${validTextClass}`}
                    id="news-image"
                    type="file"
                    name="image"
                    onChange={onImageChanged}
                />

                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        // onClick={onSaveNewsClicked}
                        disabled={!canSave}
                    >
                        Save
                    </button>
                    <button
                        className="icon-button"
                        title="Delete"
                        // onClick={onDeleteNewsClicked}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </main>
    );

    return content;
};

export default EditNewsForm;
