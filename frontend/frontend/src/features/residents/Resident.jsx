import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectResidentById } from "./residentsApiSlice";
import { AiOutlineEdit } from "react-icons/ai";

const Resident = ({ residentId }) => {
    const resident = useSelector((state) =>
        selectResidentById(state, residentId)
    );
    const navigate = useNavigate();

    if (resident) {
        const handleEdit = () =>
            navigate(`/personal/residents-list/${residentId}`);

        return (
            <tr className="border-b bg-amber-200 text-black">
                <td className="px-6 py-4">{resident.username}</td>
                <td className="px-6 py-4">{resident.residentName}</td>
                <td className="px-6 py-4">{resident.residentSurname}</td>
                <td className="px-6 py-4">{resident.currentDebt}</td>
                <td className="px-6 py-4">
                    <button onClick={handleEdit}>
                        <AiOutlineEdit></AiOutlineEdit>
                    </button>
                </td>
            </tr>
        );
    } else return null;
};

export default Resident;
