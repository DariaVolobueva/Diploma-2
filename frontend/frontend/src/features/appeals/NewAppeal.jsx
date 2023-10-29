import { useSelector } from "react-redux";
import {
    selectAllResidents,
    useGetResidentsQuery,
} from "../residents/residentsApiSlice";
import NewAppealForm from "./NewAppealForm";

const NewAppeal = () => {
    const {
        data: residents,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetResidentsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    if (!residents) {
        return <p className="mt-10">No permission</p>;
    }
    // const residents = useSelector(selectAllResidents);

    const content = residents ? (
        <NewAppealForm residents={residents}></NewAppealForm>
    ) : (
        <p>Loading...</p>
    );

    return content;
};

export default NewAppeal;
