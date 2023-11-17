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

    return (
        <main>
            <div className="flex flex-col items-center px-96">
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
                            <div className="flex flex-col max-w-xl font-serif justify-start">
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

                {/* <div className="flex flex-row items-center">
                    <img src={newsImg} alt="" className="w-96" />
                    <div className="flex flex-col max-w-xl font-serif">
                        <h3 className="underline pb-4 text-2xl">
                            ЗВІТИ ПРАВЛІННЯ!
                        </h3>
                        <p className="text-lg">
                            Шановні мешканці! До Звіту про
                            фінансово-господарську діяльність ОСББ додано
                            інформацію за серпень 2023 р. Пропонуємо
                            ознайомитись з інформацією щодо надходжень/витрат,
                            залишків коштів та стану розрахунків в розрізі
                            місяців з початку року в діаграмах та в табличному
                            варіанті.
                        </p>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                <div className="flex flex-row items-center">
                    <img src={newsImg} alt="" className="w-96" />
                    <div className="flex flex-col max-w-xl font-serif">
                        <h3 className="underline pb-4 text-2xl">
                            НОВІ ДОМОФОНИ BAS IP
                        </h3>
                        <p className="text-lg">
                            У зв'язку з неможливістю подальшого обслуговування
                            домофонів VISIT (виробник росія), для підвищення
                            безпеки доступу в будинок встановлено нову домофонну
                            систему bas IP. Загальна інформація щодо причин
                            заміни та можливості нової системи доступна за
                            посиланням. Для замовлення ключів/додатків просимо
                            заповнювати форму ОПИТУВАННЯ
                        </p>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                <div className="flex flex-row items-center">
                    <img src={newsImg} alt="" className="w-96" />
                    <div className="flex flex-col max-w-xl font-serif">
                        <h3 className="underline pb-4 text-2xl">
                            НОВІ ДОМОФОНИ BAS IP
                        </h3>
                        <p className="text-lg">
                            У зв'язку з неможливістю подальшого обслуговування
                            домофонів VISIT (виробник росія), для підвищення
                            безпеки доступу в будинок встановлено нову домофонну
                            систему bas IP. Загальна інформація щодо причин
                            заміни та можливості нової системи доступна за
                            посиланням. Для замовлення ключів/додатків просимо
                            заповнювати форму ОПИТУВАННЯ
                        </p>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                <div className="flex flex-row items-center">
                    <img src={newsImg} alt="" className="w-96" />
                    <div className="flex flex-col max-w-xl font-serif">
                        <h3 className="underline pb-4 text-2xl">
                            НОВІ ДОМОФОНИ BAS IP
                        </h3>
                        <p className="text-lg">
                            У зв'язку з неможливістю подальшого обслуговування
                            домофонів VISIT (виробник росія), для підвищення
                            безпеки доступу в будинок встановлено нову домофонну
                            систему bas IP. Загальна інформація щодо причин
                            заміни та можливості нової системи доступна за
                            посиланням. Для замовлення ключів/додатків просимо
                            заповнювати форму ОПИТУВАННЯ
                        </p>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400" />
                <div className="flex flex-row items-center">
                    <img src={newsImg} alt="" className="w-96" />
                    <div className="flex flex-col max-w-xl font-serif">
                        <h3 className="underline pb-4 text-2xl">
                            НОВІ ДОМОФОНИ BAS IP
                        </h3>
                        <p className="text-lg">
                            У зв'язку з неможливістю подальшого обслуговування
                            домофонів VISIT (виробник росія), для підвищення
                            безпеки доступу в будинок встановлено нову домофонну
                            систему bas IP. Загальна інформація щодо причин
                            заміни та можливості нової системи доступна за
                            посиланням. Для замовлення ключів/додатків просимо
                            заповнювати форму ОПИТУВАННЯ
                        </p>
                    </div>
                </div> */}
            </div>
        </main>
    );
};

export default PublicNews;
