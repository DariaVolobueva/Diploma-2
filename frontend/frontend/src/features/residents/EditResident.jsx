import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectResidentById } from "./residentsApiSlice";
import EditResidentForm from "./EditResidentForm";

const EditResident = () => {
    const { id } = useParams();

    const resident = useSelector((state) => selectResidentById(state, id));

    const content = resident ? (
        <EditResidentForm resident={resident}></EditResidentForm>
    ) : (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center">
            <p>Loading...</p>
        </main>
    );

    return content;
};

export default EditResident;
