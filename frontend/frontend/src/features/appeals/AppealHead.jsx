import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAppealById } from "./appealsApiSlice";
import { AiOutlineEdit } from "react-icons/ai";

const AppealHead = ({ appealId }) => {
    const appeal = useSelector((state) => selectAppealById(state, appealId));
    const navigate = useNavigate();

    if (appeal) {
        // const created = new Date(appeal.createdAt).toLocaleString("uk-UA", {
        //     day: "numeric",
        //     month: "long",
        // });

        // const updated = new Date(appeal.createdAt).toLocaleString("uk-UA", {
        //     day: "numeric",
        //     month: "long",
        // });

        const handleEdit = () =>
            navigate(`/personal/residents-appeals/${appealId}`);

        return (
            <tr className="border-b bg-amber-200 text-black">
                <td className="px-6 py-4">{appeal.user}</td>
                <td className="px-6 py-4">{appeal.text}</td>
                <td className="px-6 py-4">
                    {appeal.status === "Open" ? (
                        <span>На розгляді</span>
                    ) : appeal.status === "InProgress" ? (
                        <span>В процесі</span>
                    ) : appeal.status === "Closed" ? (
                        <span>Завершено</span>
                    ) : (
                        <span>Відхилено</span>
                    )}
                </td>
                <td className="px-6 py-4">
                    <button onClick={handleEdit}>
                        <AiOutlineEdit></AiOutlineEdit>
                    </button>
                </td>
            </tr>
        );
    } else return null;
};

export default AppealHead;
