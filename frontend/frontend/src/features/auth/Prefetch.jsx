import { store } from "../../app/store";
import { appealsApiSlice } from "../appeals/appealsApiSlice";
import { newsApiSlice } from "../news/newsApiSlice";
import { residentsApiSlice } from "../residents/residentsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        console.log("subscribing");
        const appeals = store.dispatch(
            appealsApiSlice.endpoints.getAppeals.initiate()
        );
        const residents = store.dispatch(
            residentsApiSlice.endpoints.getResidents.initiate()
        );
        const news = store.dispatch(newsApiSlice.endpoints.getNews.initiate());

        return () => {
            console.log("unsubscribing");
            appeals.unsubscribe();
            residents.unsubscribe();
            news.unsubscribe();
        };
    }, []);

    return <Outlet></Outlet>;
};

export default Prefetch;
