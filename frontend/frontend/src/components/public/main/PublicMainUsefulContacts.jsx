const PublicMainUsefulContacts = () => {
    return (
        <section>
            <div className="bg-yellow-400 py-8 uppercase font-serif px-28 text-3xl">
                Корисні контакти
            </div>
            <div className="flex flex-col px-56">
                <div className="flex flex-row items-center max-w-4xl justify-between py-6">
                    <a
                        className="underline pb-4 text-2xl pr-8 text-left uppercase"
                        href="http://cnap.rda.dp.ua/"
                    >
                        ЦЕНТР НАДАННЯ АДМІНІСТРАТИВНИХ ПОСЛУГ
                    </a>
                    <div>
                        <iframe
                            className="w-72 sm:w-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27813.46305223833!2d35.87655134827366!3d48.52454145199296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40deb9cd20e13653%3A0x5d740b7d3957bc0c!2sTsnap%20Mista%20Pavlohrad!5e0!3m2!1sen!2sua!4v1696633437053!5m2!1sen!2sua"
                            width="400"
                            height="300"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400 self-center" />
                <div className="flex flex-row items-center max-w-4xl justify-between py-6">
                    <a
                        className="underline pb-4 text-2xl pr-8 text-left uppercase"
                        href="https://ukrposhta.ua/ua"
                    >
                        Укрпошта 51409
                    </a>
                    <div>
                        <iframe
                            className="w-72 sm:w-full "
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.835959837975!2d35.929175171122246!3d48.49804375262258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40deb90ac146ac07%3A0xb93d95c14fd3aa5d!2sUkrposhta%2051409!5e0!3m2!1sen!2sua!4v1696634018121!5m2!1sen!2sua"
                            width="400"
                            height="300"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <hr className="w-96 max-w-xl h-1 bg-yellow-400 self-center" />
                <div className="flex flex-row items-center max-w-4xl justify-between py-6">
                    <a
                        className="underline pb-4 text-2xl pr-8 text-left uppercase"
                        href="https://pavlonews.dp.ua/spravochnik/kommunalnie-predpritiia/edinoe-okno"
                    >
                        Єдине вікно
                    </a>
                    <div>
                        <iframe
                            className="w-72 sm:w-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.0603267304346!2d35.87300168841309!3d48.53207559726262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40deb9506d47acfd%3A0x25f510a857621cb0!2z0JXQtNC40L3QvtC1INCe0LrQvdC-!5e0!3m2!1sen!2sua!4v1696633684294!5m2!1sen!2sua"
                            width="400"
                            height="300"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicMainUsefulContacts;
