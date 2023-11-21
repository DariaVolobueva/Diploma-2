import React from "react";
import { IoWaterSharp } from "react-icons/io5";
import { GrInherit } from "react-icons/gr";
import { IoBulbOutline } from "react-icons/io5";
import { IoWaterOutline } from "react-icons/io5";
import { IoBonfireOutline } from "react-icons/io5";
import { IoLeafOutline } from "react-icons/io5";
import { IoFlashOutline } from "react-icons/io5";
import { BiCube } from "react-icons/bi";

const PublicContacts = () => {
    const elem = <IoWaterSharp size={64}></IoWaterSharp>;
    return (
        <>
            <div className="bg-yellow-400 py-8 uppercase font-montserrat px-28 text-3xl">
                Контакти комунальних підприємств
            </div>
            <section className="flex flex-row flex-wrap justify-center font-montserrat px-12 py-12">
                <div className="flex flex-col items-center px-8 py-4 max-w-xs">
                    <GrInherit size={64}></GrInherit>
                    <p className=" text-2xl text-center">
                        Диспетчерська служба міста
                    </p>
                    <p className=" text-2xl">20-45-99</p>
                    <p className=" text-2xl">095-225-41-92</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <IoBulbOutline size={64}></IoBulbOutline>
                    <p className=" text-2xl">КП «Павлоград-Світло»</p>
                    <p className=" text-2xl">095-225-41-92</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <IoWaterOutline size={64}></IoWaterOutline>
                    <p className=" text-2xl">КП «Павлоградводоканал»</p>
                    <p className=" text-2xl">050-051-31-35</p>
                    <p className=" text-2xl">050-758-46-69</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <IoBonfireOutline size={64}></IoBonfireOutline>
                    <p className=" text-2xl">КП «Павлоградтеплоенерго»</p>
                    <p className=" text-2xl">073-313-97-30</p>
                    <p className=" text-2xl">073-313-97-15</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <IoLeafOutline size={64}></IoLeafOutline>
                    <p className=" text-2xl">КП «Затишне місто»</p>
                    <p className=" text-2xl">066-085-35-77</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <IoFlashOutline size={64}></IoFlashOutline>
                    <p className=" text-2xl">ДТЕК Дніпровські електромережі</p>
                    <p className=" text-2xl">067-790-99-00</p>
                    <p className=" text-2xl">066-790-99-00</p>
                </div>
                <div className="flex flex-col items-center px-8 py-4">
                    <BiCube size={64}></BiCube>
                    <p className=" text-2xl">ТОВ «Дніпропетровськгаз Збут»</p>
                    <p className=" text-2xl">050-051-31-35</p>
                    <p className=" text-2xl">050-758-46-69</p>
                </div>
            </section>
        </>
    );
};

export default PublicContacts;
