import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAppealById } from "./appealsApiSlice";
import { selectAllResidents } from "../residents/residentsApiSlice";
import EditAppealForm from "./EditAppealForm";

const EditAppeal = () => {
    const { id } = useParams();

    const appeal = useSelector((state) => selectAppealById(state, id));
    const residents = useSelector(selectAllResidents);

    const content =
        appeal && residents ? (
            <EditAppealForm
                appeal={appeal}
                residents={residents}
            ></EditAppealForm>
        ) : (
            <p>Loading...</p>
        );

    return content;
};

export default EditAppeal;
