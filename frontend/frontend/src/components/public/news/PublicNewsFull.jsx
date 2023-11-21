import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchNews = async () => {
    try {
        const response = await axios.get("http://localhost:3500/news");
        return response.data; // Дані про новини
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

const PublicNewsFull = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    console.log("I in the public news before useEffect");

    useEffect(() => {
        console.log("Im inside useEffect");
        const getNews = async () => {
            try {
                // console.log("I`m in try catch");
                const newsData = await fetchNews();
                setNews(newsData);
            } catch (error) {
                console.error("Error getting news:", error);
            }
        };

        getNews();
    }, []);

    // console.log(news);
    const newsFull = news.find((obj) => obj._id === id);
    // console.log(newsFull);
    return (
        <section className="flex flex-col gap-6 items-center">
            {newsFull && (
                <>
                    <img
                        src={newsFull.img}
                        alt=""
                        className="w-96 h-96  mr-10"
                    />
                    <div className="flex flex-col max-w-full font-montserrat justify-center items-center">
                        <h3 className="underline pb-4 text-2xl">
                            {newsFull.title}
                        </h3>
                        <p className="text-lg my-6">{newsFull.text}</p>
                    </div>
                </>
            )}
        </section>
    );
};

export default PublicNewsFull;
