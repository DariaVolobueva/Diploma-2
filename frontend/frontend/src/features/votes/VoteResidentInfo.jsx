import { useSelector } from "react-redux";
import { selectResidentById } from "../residents/residentsApiSlice";

const VoteResidentInfo = ({ id }) => {
    const resident = useSelector((state) => selectResidentById(state, id));

    return <p>{`${resident.residentName} ${resident.residentSurname}`}</p>;
};

export default VoteResidentInfo;
