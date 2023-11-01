import { useGetResidentsQuery } from "./residentsApiSlice";
import Resident from "./Resident";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ResidentsList = () => {
    const navigate = useNavigate();
    const {
        data: residents,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetResidentsQuery("residentsList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="text-red-500">{error?.data?.message}</p>;
    }

    if (isSuccess && residents) {
        const { ids } = residents;

        const tableContent = ids?.length
            ? ids.map((residentId) => (
                  <Resident key={residentId} residentId={residentId} />
              ))
            : null;
        content = (
            <>
                <button
                    className="p-4 bg-yellow-400 rounded-md self-start mb-3 flex flex-row items-center gap-1"
                    onClick={() => navigate("/personal/residents-list/new")}
                >
                    Додати нового мешканця
                    <AiOutlineUserAdd size={25}></AiOutlineUserAdd>
                </button>
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-yellow-400 ">
                        <tr>
                            <th className="px-6 py-3">Номер квартири</th>
                            <th className="px-6 py-3">Ім'я</th>
                            <th className="px-6 py-3">Прізвище</th>
                            <th className="px-6 py-3">Поточний борг</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-yellow-400">
                        {tableContent}
                    </tbody>
                </table>
            </>
        );
    }

    if (!residents) {
        content = <p>Немає мешканців будинку</p>;
    }

    return (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center">
            {content}
        </main>
    );
};

export default ResidentsList;
