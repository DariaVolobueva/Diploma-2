import { useGetNewsQuery } from "./newsApiSlice";
import News from "./News";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
    const navigate = useNavigate();
    const {
        data: news,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetNewsQuery("newsList", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="text-red-500">{error?.data?.message}</p>;
    }

    if (isSuccess && news) {
        const { ids } = news;

        const tableContent = ids?.length
            ? ids.map((newsId) => <News key={newsId} newsId={newsId} />)
            : null;

        content = (
            <>
                <button
                    className="p-4 bg-yellow-400 rounded-md self-start mb-3 flex flex-row items-center gap-1"
                    onClick={() => navigate("/personal/news/new")}
                >
                    Додати новину
                    <AiOutlineFileAdd size={25}></AiOutlineFileAdd>
                </button>
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-yellow-400 ">
                        <tr>
                            <th className="px-6 py-3">Зображення</th>
                            <th className="px-6 py-3">Назва</th>
                            <th className="px-6 py-3">Зміст</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-yellow-400">
                        {tableContent}
                    </tbody>
                </table>
            </>
        );
    }

    if (!news) {
        content = <p>Вітаємо! Новин на даний час немає</p>;
    }

    return (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center">
            {content}
        </main>
    );
};

export default NewsList;
