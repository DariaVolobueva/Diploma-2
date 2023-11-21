import { useGetVotesQuery } from "./votesApiSlice";
import Vote from "./Vote";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const VoteList = () => {
    const navigate = useNavigate();
    const { roles } = useAuth();
    const {
        data: vote,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetVotesQuery("votesList", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="text-red-500">{error?.data?.message}</p>;
    }

    if (isSuccess && vote) {
        const { ids } = vote;
        const data = ids?.length
            ? ids.map((voteId) => <Vote key={voteId} voteId={voteId}></Vote>)
            : null;
        content = (
            <section className="flex flex-col">
                {roles.includes("Head") && (
                    <button
                        className="p-4 bg-yellow-400 rounded-md self-start mb-3 flex flex-row items-center gap-1"
                        onClick={() => navigate("/personal/voting/new")}
                    >
                        Додати голосування
                        <MdFormatListBulletedAdd
                            size={25}
                        ></MdFormatListBulletedAdd>
                    </button>
                )}
                <div className="flex flex-row gap-8 items-center justify-center flex-wrap">
                    {data}
                </div>
            </section>
        );
    }

    if (!vote) {
        content = <p>Вітаємо! Votes на даний час немає</p>;
    }

    return <main className="my-14 mx-6 w-full font-montserrat">{content}</main>;
};

export default VoteList;
