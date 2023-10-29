import { store } from "../../app/store";
import { appealsApiSlice } from "../appeals/appealsApiSlice";
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

        return () => {
            console.log("unsubscribing");
            appeals.unsubscribe();
            residents.unsubscribe();
        };
    }, []);

    return <Outlet></Outlet>;
};

export default Prefetch;
