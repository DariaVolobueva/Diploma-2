import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { selectResidentById } from "../residents/residentsApiSlice";
import LogoPrivat from "../../assets/images/Privat24_Logo.png";
import LogoOschad from "../../assets/images/Oschadbank.png";
import LogoPivden from "../../assets/images/5ddfc0c097c2d.jpg";
import LogoSense from "../../assets/images/Sense_bank_logo.png";
import LogoOtp from "../../assets/images/Otp_bank_logo.png";
import LogoIPay from "../../assets/images/ipay.png";

const AccrualList = () => {
    let content;

    const { id } = useAuth();

    const resident = useSelector((state) => selectResidentById(state, id));
    content = (
        <>
            <section className="flex flex-row w-full justify-between">
                <div className="bg-yellow-400 p-4 rounded-xl aspect-square flex flex-col">
                    <p>Поточний стан рахунку:</p>
                    <p className="text-6xl mt-16">
                        {resident.currentDebt} грн.
                    </p>
                </div>
                <div className="bg-slate-100 p-4 rounded-xl justify-between">
                    <p>Посилання на оплату:</p>
                    <div className="flex flex-row py-3 gap-4 items-center justify-center mt-5 flex-wrap">
                        <a href="https://next.privat24.ua/payments/form/%7B%22companyID%22:%221262126%22,%22form%22:%7B%22query%22:%22UAUA233052990000026006050278469%22%7D%7D">
                            <img
                                src={LogoPrivat}
                                className="aspect-square w-36"
                                alt=""
                            />
                        </a>
                        <a href="https://www.oschadbank.ua/payments#online">
                            <img src={LogoOschad} className=" w-36" alt="" />
                        </a>
                        <a href="https://my.bank.com.ua/ifobsClientPivd/LoginForm.action">
                            <img src={LogoPivden} className=" w-36" alt="" />
                        </a>
                        <a href="https://help.sensebank.com.ua/hc/uk-ua/articles/360016837300">
                            <img src={LogoSense} className=" w-36" alt="" />
                        </a>
                        <a href="https://www.otpbank.com.ua/privateclients/payments/payment-services/">
                            <img src={LogoOtp} className=" w-36" alt="" />
                        </a>
                        <a href="https://www.ipay.ua/ua/p2r">
                            <img src={LogoIPay} className=" w-36" alt="" />
                        </a>
                    </div>
                </div>
            </section>
            <section className="mt-5 w-full">
                <p className="py-2">Формування рахунку з 4.50 за кв2</p>
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-yellow-400 ">
                        <tr>
                            <th className="px-6 py-3">Послуга</th>
                            <th className="px-6 py-3">Сума з кв2</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-yellow-400">
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Технічне обслуговування внутрішньобудинкових
                                систем (водопостачання, водовідведення,
                                теплопостачання, зливової каналізації,
                                електропостачання, газопостачання)
                            </td>
                            <td className="px-6 py-4">1,1440</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Дератизація, дезинсекція
                            </td>
                            <td className="px-6 py-4">0,0370</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Прибирання, утримання, облаштування та
                                благоустрій прибудинкової території
                            </td>
                            <td className="px-6 py-4">0,8110</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Обслуговування вентиляційних каналів
                            </td>
                            <td className="px-6 py-4">0,0390</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Поточний ремонт конструктивних елементів,
                                технічних пристроїв будинку та
                                внутрішньобудинкових систем (водопостачання,
                                водовідведення, теплопостачання, зливової
                                каналізації, електропостачання)
                            </td>
                            <td className="px-6 py-4">1,3240</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Освітлення місць загального користування
                            </td>
                            <td className="px-6 py-4">0,1720</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Підготовка житлового будинку до експлуатації в
                                осінньо-зимовий період
                            </td>
                            <td className="px-6 py-4">0,0510</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">Поливання клумб</td>
                            <td className="px-6 py-4">0,0410</td>
                        </tr>
                        <tr className="border-b bg-amber-200 text-black">
                            <td className="px-6 py-4">
                                Адміністративні витрати
                            </td>
                            <td className="px-6 py-4">0,8810</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );

    return (
        <main className="my-14 mx-6 w-full flex flex-col items-center justify-center font-montserrat">
            {content}
        </main>
    );
};

export default AccrualList;
