import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAppealById } from "./appealsApiSlice";
import { AiOutlineEdit } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { selectResidentById } from "../residents/residentsApiSlice";

const AppealHead = ({ appealId }) => {
    const appeal = useSelector((state) => selectAppealById(state, appealId));
    const residentId = appeal?.user;

    const resident = useSelector((state) =>
        selectResidentById(state, residentId)
    );
    const username = resident.username;

    const navigate = useNavigate();
    const { roles } = useAuth();

    if (appeal) {
        // const created = new Date(appeal.createdAt).toLocaleString("uk-UA", {
        //     day: "numeric",
        //     month: "long",
        // });

        // const updated = new Date(appeal.createdAt).toLocaleString("uk-UA", {
        //     day: "numeric",
        //     month: "long",
        // });

        const handleEdit = () => {
            if (roles.includes("Head")) {
                navigate(`/personal/residents-appeals/${appealId}`);
            } else {
                navigate(`/personal/my-appeals/${appealId}`);
            }
        };

        return (
            <tr className="border-b bg-amber-200 text-black">
                {roles.includes("Head") ? (
                    <td className="px-6 py-4">{username}</td>
                ) : (
                    ""
                )}
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
