import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        <main className="my-14 w-full flex flex-col items-center justify-center font-montserrat">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
            >
                <label className=" my-2">
                    Питання:
                    <input
                        type="text"
                        className={` h-10 bg-yellow-100 rounded-lg px-4 ml-2`}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </label>
                <p className=" my-2">Опції:</p>
                <ul>
                    {options.map((option, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={option}
                                className={`h-10 bg-yellow-100 rounded-lg px-4 mb-2`}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                            />
                        </li>
                    ))}
                </ul>
                <div className="flex flex-row gap-6 mt-3">
                    <button
                        type="button"
                        className="bg-yellow-400 p-3 rounded-md"
                        onClick={handleAddOption}
                    >
                        Додати опцію
                    </button>
                    <button
                        type="submit"
                        className="bg-yellow-400 p-3 rounded-md"
                    >
                        Створити голосування
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

export default NewVoteForm;
