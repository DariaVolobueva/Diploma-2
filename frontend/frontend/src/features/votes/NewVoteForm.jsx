import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewVotesMutation } from "./votesApiSlice";

const NewVoteForm = () => {
    const [addNewVotes, { isLoading, isSuccess, isError, error }] =
        useAddNewVotesMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/personal/voting");
        }
    }, [isSuccess, navigate]);

    const onSubmitVoteClicked = async (e) => {
        e.preventDefault();
    };

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const voteData = {
            question,
            options: options.map((text) => ({ text, votes: 0 })),
        };
        await addNewVotes(voteData);
    };

    const content = (
        <main className="my-14 w-full flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit}>
                <label>
                    Питання:
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </label>
                <p>Опції:</p>
                <ul>
                    {options.map((option, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                            />
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={handleAddOption}>
                    Додати опцію
                </button>
                <button type="submit">Створити голосування</button>
            </form>
        </main>
    );

    return content;
};

export default NewVoteForm;
