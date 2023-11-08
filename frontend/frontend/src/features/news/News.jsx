import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectNewsById } from "./newsApiSlice";
import { AiOutlineEdit } from "react-icons/ai";

const News = ({ newsId }) => {
    const news = useSelector((state) => selectNewsById(state, newsId));
    const navigate = useNavigate();

    if (news) {
        const handleEdit = () => navigate(`/personal/news/${newsId}`);

        return (
            <tr className="border-b bg-amber-200 text-black">
                <td className="px-6 py-4">
                    <img src={news.img} alt="" />
                </td>
                <td className="px-6 py-4">{news.title}</td>
                <td className="px-6 py-4">{news.text}</td>
                <td className="px-6 py-4">
                    <button onClick={handleEdit}>
                        <AiOutlineEdit></AiOutlineEdit>
                    </button>
                </td>
            </tr>
        );
    } else return null;
};

export default News;
