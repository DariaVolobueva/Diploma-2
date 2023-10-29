const PublicFooter = () => {
    return (
        <footer className="bg-yellow-400 flex flex-row justify-around py-10 font-serif text-sm flex-wrap">
            <section>
                <div className="pb-6 uppercase">Інформація</div>
                <div>
                    <div className="pb-6">
                        <p>ОСББ «УРЛІВСЬКА 20»</p>
                        <p>ЄДРПОУ 42565457</p>
                        <p>02081, м.Київ, вул. Урлівська, 20</p>
                    </div>
                    <div className="pb-6">
                        <p>Реквізити</p>
                        <p>IBAN UA173052990000026002026218833</p>
                        <p>МФО 305299</p>
                        <p>АТ КБ «ПРИВАТБАНК»</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="pb-6 uppercase">КОНТАКТИ</div>
                <div>
                    <div className="pb-6">
                        <p>Голова правління ОСББ "УРЛІВСЬКА 20"</p>
                        <p>Денисенко Інна Валентинівна </p>
                        <p>+380 (63) 843 43 89 (прийом за телефоном) </p>
                    </div>
                    <div className="pb-6">
                        <p>Бухгалтер</p>
                        <p>Кравченко Ірина Миколаївна</p>
                        <p>+380 (67) 255-32 72 (прийом за телефоном)</p>
                    </div>
                    <div className="pb-6">
                        <p>Сантехніка/електрика</p>
                        <p>Кравченко Ірина Миколаївна</p>
                        <p>+380 (67) 359 51 95</p>
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
