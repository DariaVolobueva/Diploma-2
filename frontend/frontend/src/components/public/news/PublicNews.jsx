import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const fetchNews = async () => {
    try {
        const response = await axios.get("http://localhost:3500/news");
        return response.data; // Дані про новини
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

const PublicNews = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNews = async () => {
            try {
                const newsData = await fetchNews();
                setNews(newsData);
            } catch (error) {
                console.error("Error getting news:", error);
            }
        };

        getNews();
    }, []);

    news.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    return (
        <main>
            <div className="flex flex-col items-center lg:px-96 px-2">
                {news.map((news) => (
                    <>
                        <div
                            key={news.id}
                            className="flex flex-row items-center w-full my-10"
                        >
                            <img
                                src={news.img}
                                alt=""
                                className="w-96 h-96  mr-10"
                            />
                            <div className="flex flex-col max-w-xl font-montserrat justify-start">
                                <Link
                                    to={`/news/${news._id}`}
                                    className="underline pb-4 text-2xl"
                                >
                                    <p className="uppercase">{news.title}</p>
                                </Link>
                                <p className="text-lg">{news.text}</p>
                            </div>
                        </div>
                        <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                    </>
                ))}
            </div>
        </main>
    );
};

export default PublicNews;
