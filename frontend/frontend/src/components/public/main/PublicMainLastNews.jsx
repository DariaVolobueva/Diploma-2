import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const fetchNews = async () => {
    try {
        const response = await axios.get("http://localhost:3500/news");
        return response.data; // Дані про новини
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

const PublicMainLastNews = () => {
    const [news, setNews] = useState([]);

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

    return (
        <section>
            <div className="bg-yellow-400 py-8 uppercase font-serif px-28 text-3xl">
                Останні новини
            </div>
            <div className="flex flex-col items-center px-96">
                {news.slice(0, 3).map((news) => (
                    <>
                        <div className="flex flex-row items-center w-full my-10">
                            <img
                                src={news.img}
                                alt=""
                                className="w-96 h-96  mr-10"
                            />
                            <div className="flex flex-col max-w-xl font-serif">
                                <Link
                                    to={`/news/${news._id}`}
                                    className="underline pb-4 text-2xl"
                                >
                                    {news.title}
                                </Link>
                                <p className="text-lg">{news.text}</p>
                            </div>
                        </div>
                        <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                    </>
                ))}
            </div>
        </section>
    );
};

export default PublicMainLastNews;
