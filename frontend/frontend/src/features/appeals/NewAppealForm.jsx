import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewAppealMutation } from "./appealsApiSlice";
import { selectResidentById } from "./../residents/residentsApiSlice";
import AppealsOptions from "./AppealsOptions";

const NewAppealForm = ({ residents }) => {
    const [addNewAppeal, { isLoading, isSuccess, isError, error }] =
        useAddNewAppealMutation();

    const navigate = useNavigate();

    const [text, setText] = useState("");
    const [userId, setUserId] = useState(residents.ids[0]);

    useEffect(() => {
        if (isSuccess) {
            setText("");
            setUserId("");
            navigate("/personal/residents-appeals");
        }
    }, [isSuccess, navigate]);

    const onTextChanged = (e) => setText(e.target.value);
    const onUserIdChanged = (e) => setUserId(e.target.value);

    const canSave = [text, userId].every(Boolean) && !isLoading;

    const onSaveAppealClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewAppeal({ user: userId, text });
        }
    };

    const { ids } = residents;
    // ids?.length
    //         ? ids.map((residentId) => (
    //               <Resident key={residentId} residentId={residentId} />
    //           ))

    const options = ids?.length
        ? ids.map((residentId) => (
              <>
                  <label htmlFor="">
                      <AppealsOptions
                          key={residentId}
                          residentId={residentId}
                      ></AppealsOptions>
                  </label>
                  <input
                      name={residentId}
                      type="radio"
                      value={residentId}
                      onChange={onUserIdChanged}
                      id=""
                  ></input>
              </>
          ))
        : null;
    console.log(options);

    const errClass = isError ? "errmsg" : "offscreen";
    const validTextClass = !text ? "form__input--incomplete" : "";

    const content = (
        <main className="my-8">
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveAppealClicked}>
                <div className="form__title-row">
                    <h2>New Appeal</h2>
                </div>

                <label className="form__label" htmlFor="text">
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label
                    className="form__label form__checkbox-container"
                    htmlFor="username"
                >
                    ASSIGNED TO:
                </label>
                {options}
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        disabled={!canSave}
                    >
                        Save
                    </button>
                </div>
            </form>
        </main>
    );

    return content;
};

export default NewAppealForm;
