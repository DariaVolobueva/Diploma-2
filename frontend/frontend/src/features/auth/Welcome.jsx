import { Link, useOutletContext } from "react-router-dom";

const Welcome = () => {
    const [activeMenu] = useOutletContext();
    const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const today = new Intl.DateTimeFormat("uk-UA", options)
        .format(date)
        .toUpperCase();

    const content = (
        <section className={activeMenu ? "ml-72" : "w-full"}>
            {console.log(activeMenu)}
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/personal/appeals">View appeals</Link>
            </p>
            <p>
                <Link to="/personal/residents">View Residents</Link>
            </p>
        </section>
    );

    return content;
};
export default Welcome;
