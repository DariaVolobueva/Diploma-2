import { selectResidentById } from "./../residents/residentsApiSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const AppealsOptions = ({ residentId }) => {
    console.log(residentId);
    const resident = useSelector((state) =>
        selectResidentById(state, residentId)
    );

    return resident.username;
};

export default AppealsOptions;
