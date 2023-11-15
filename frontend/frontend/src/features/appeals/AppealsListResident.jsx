import { useGetAppealsQuery } from "./appealsApiSlice";
import AppealHead from "./AppealHead";
import useAuth from "../../hooks/useAuth";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AppealsListResident = () => {
    const {
        data: appeals,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAppealsQuery("appealsList", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const navigate = useNavigate();

    const { id } = useAuth();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="text-red-500">{error?.data?.message}</p>;
    }

    if (isSuccess && appeals) {
        const { entities } = appeals;
        const appealsList = Object.values(entities).filter(
            (appeal) => appeal.user === id
        );

        if (appealsList) {
            const appealsIds = appealsList.map((appeal) => appeal.id);

            const tableContent = appealsIds?.length
                ? appealsIds.map((appealId) => (
                      <AppealHead key={appealId} appealId={appealId} />
                  ))
                : null;

            content = (
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-yellow-400 ">
                        <tr>
                            <th className="px-6 py-3">Звернення</th>
                            <th className="px-6 py-3">Прогресс</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-yellow-400">
                        {tableContent}
                    </tbody>
                </table>
            );
        } else {
            content = <p>Ви ще не написали жодного звернення</p>;
        }
    }

    if (!appeals) {
        content = <p>Вітаємо! Звернень на даний час немає</p>;
    }

    return (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center">
            <button
                className="p-4 bg-yellow-400 rounded-md self-start mb-3 flex flex-row items-center gap-1"
                onClick={() => navigate("/personal/my-appeals/new")}
            >
                Додати нове звернення
                <AiOutlineFileAdd size={25}></AiOutlineFileAdd>
            </button>
            {content}
        </main>
    );
};

export default AppealsListResident;
