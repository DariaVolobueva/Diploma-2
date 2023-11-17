import { useSelector } from "react-redux";
import {
    selectVotesById,
    useUpdateVotesMutation,
    useDeleteVotesMutation,
} from "./votesApiSlice";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import VoteResidentInfo from "./VoteResidentInfo";
import { useNavigate } from "react-router-dom";

const Vote = ({ voteId }) => {
    const vote = useSelector((state) => selectVotesById(state, voteId));

    const navigate = useNavigate();

    const { id, roles } = useAuth();

    let isIdPresent = vote.voters.some((item) => item._id === id);

    if (roles.includes("Head")) {
        isIdPresent = true;
    }

    const [optionNum, setOptionNum] = useState("");
    const question = vote.question;
    const options = vote.options;

    const [updateVotes, { isLoading, isSuccess, isError, error }] =
        useUpdateVotesMutation();

    const [deleteVotes] = useDeleteVotesMutation();

    const [selectedOption, setSelectedOption] = useState(null);

    const onOptionChange = (e) => {
        setOptionNum(e.target.value);
        setSelectedOption(e.target.value);
    };

    const handleDeleteSubmit = async () => {
        await deleteVotes({ id: voteId });
        navigate("/personal/residents-list");
    };

    const handleVoteSubmit = async () => {
        await updateVotes({ id: voteId, residentIds: id, optionNum });
    };

    if (vote) {
        return (
            <div className="bg-yellow-400  max-w-lg min-w-min min-h-min p-6 rounded-3xl overflow-y-auto">
                <h2 className="text-xl mb-4">{question}</h2>
                {!isIdPresent && (
                    <>
                        <form className="flex flex-col justify-center gap-4">
                            {options.map((option) => (
                                <div
                                    className="flex flex-row items-center"
                                    key={option.id}
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        value={option._id}
                                        checked={selectedOption === option._id}
                                        onChange={onOptionChange}
                                        className="accent-yellow-400 h-7 w-7"
                                    />
                                    <label>{option.text}</label>
                                </div>
                            ))}
                        </form>
                        <button
                            onClick={handleVoteSubmit}
                            className="my-4 p-3 bg-black text-white rounded-xl"
                        >
                            Проголосувати
                        </button>{" "}
                    </>
                )}

                {isIdPresent && (
                    <div>
                        <h3>Результати голосування:</h3>
                        <ul>
                            {vote.options.map((vote) => (
                                <li key={vote._id}>
                                    {vote.text}: {vote.votes} голосів
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {roles.includes("Head") && (
                    <div>
                        {vote.voters.map((resident) => (
                            <VoteResidentInfo
                                id={resident._id}
                            ></VoteResidentInfo>
                        ))}
                    </div>
                )}

                {roles.includes("Head") && (
                    <button
                        className="my-4 p-3 bg-black text-white rounded-xl"
                        onClick={handleDeleteSubmit}
                    >
                        Видалити голосування
                    </button>
                )}
            </div>
        );
    }
};

export default Vote;
