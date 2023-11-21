const PublicFooter = () => {
    return (
        <footer className="bg-yellow-400 flex flex-row justify-around py-10 font-montserrat text-sm flex-wrap">
            <section>
                <div className="pb-6 uppercase">Інформація</div>
                <div>
                    <div className="pb-6">
                        <p>ОСББ «ЗАХІДНОДОНБАСЬКА, 43»</p>
                        <p>ЄДРПОУ 40483577</p>
                        <p>51409, м.Павлоград, вул. Західнодонбаська, 43</p>
                    </div>
                    <div className="pb-6">
                        <p>Реквізити</p>
                        <p>IBAN UA233052990000026006050278469</p>
                        <p>МФО 305299</p>
                        <p>АТ КБ «ПРИВАТБАНК»</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="pb-6 uppercase">КОНТАКТИ</div>
                <div>
                    <div className="pb-6 flex flex-col">
                        <a>Голова правління ОСББ «ЗАХІДНОДОНБАСЬКА, 43»</a>
                        <a>Волобуєва Тетяна Володимирівна</a>
                        <a href="tel:+380669167540">
                            +380 (66) 916 75 40 (прийом за телефоном){" "}
                        </a>
                    </div>
                    <div className="pb-6 flex flex-col">
                        <a>Бухгалтер</a>
                        <a>Карпова Надія Іосифівна</a>
                        <a href="tel:+380991151169">
                            +380 (99) 115-11 69 (прийом за телефоном)
                        </a>
                    </div>
                    <div className="pb-6 flex flex-col">
                        <a>Сантехніка/електрика</a>
                        <a>Волобуєв Михайло Іларионович</a>
                        <a href="tel:+380661832636">+380 (66) 183 26 36</a>
                    </div>
                </div>
            </section>
            <section>
                <iframe
                    className="w-72 sm:w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1321.754867666778!2d35.932268331498086!3d48.50429239477537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40deb9205334cd97%3A0x5f4529c8a685041!2sZakhidnodonbaska%20St%2C%2043%2C%20Pavlohrad%2C%20Dnipropetrovs&#39;ka%20oblast%2C%2051400!5e0!3m2!1sen!2sua!4v1696609411324!5m2!1sen!2sua"
                    width="400"
                    height="300"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </footer>
    );
};

export default PublicFooter;
