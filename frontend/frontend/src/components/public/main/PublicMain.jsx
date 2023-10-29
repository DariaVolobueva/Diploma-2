import budynok from "./../../../assets/images/mnogokvartirnyj-dom.jpg";
import PublicMainLastNews from "./PublicMainLastNews";
import PublicMainUsefulContacts from "./PublicMainUsefulContacts";

const PublicMain = () => {
    return (
        <main className="relative">
            <section className="relative ">
                <div className="relative bg-building bg-black blur-sm  p-80 bg-no-repeat bg-center bg-cover flex justify-center items-center bg-fixed"></div>
                <p className="text-black absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 font-serif text-5xl">
                    ОСББ ЗАХІДНОДОНБАСЬКА 43
                </p>
            </section>
            <PublicMainLastNews></PublicMainLastNews>
            <PublicMainUsefulContacts></PublicMainUsefulContacts>
        </main>
    );
};

export default PublicMain;
