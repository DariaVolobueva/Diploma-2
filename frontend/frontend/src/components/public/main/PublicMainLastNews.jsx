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

    news.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    return (
        <section>
            <div className="bg-yellow-400 py-8 uppercase font-montserrat px-28 text-3xl">
                Останні новини
            </div>
            <div className="flex flex-col items-center lg:px-96 px-2">
                {news.slice(0, 3).map((news) => (
                    <>
                        <div className="flex flex-row items-center w-full lg:my-10 my-0">
                            <img
                                src={news.img}
                                alt=""
                                className="w-96 h-96 mr-10 my-4"
                            />
                            <div className="flex flex-col lg:max-w-xl w-full font-montserrat">
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
        </section>
    );
};

export default PublicMainLastNews;
