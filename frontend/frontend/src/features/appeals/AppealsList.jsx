import { useGetAppealsQuery } from "./appealsApiSlice";
import AppealHead from "./AppealHead";

const AppealsList = () => {
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

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="text-red-500">{error?.data?.message}</p>;
    }

    if (isSuccess && appeals) {
        const { ids } = appeals;

        const tableContent = ids?.length
            ? ids.map((appealId) => (
                  <AppealHead key={appealId} appealId={appealId} />
              ))
            : null;

        content = (
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-yellow-400 ">
                    <tr>
                        <th className="px-6 py-3">Мешканець</th>
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
    }

    if (!appeals) {
        content = <p>Вітаємо! Звернень на даний час немає</p>;
    }

    return (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center">
            {content}
        </main>
    );
};

export default AppealsList;
