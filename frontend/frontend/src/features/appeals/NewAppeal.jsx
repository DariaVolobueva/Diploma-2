import { useSelector } from "react-redux";
import {
    selectAllResidents,
    useGetResidentsQuery,
} from "../residents/residentsApiSlice";
import NewAppealForm from "./NewAppealForm";
import useAuth from "../../hooks/useAuth";

const NewAppeal = () => {
    const { id } = useAuth();

    if (!id) {
        return <p className="mt-10">No permission</p>;
    }

    const content = id ? (
        <NewAppealForm id={id}></NewAppealForm>
    ) : (
        <p>Loading...</p>
    );

    return content;
};

export default NewAppeal;
