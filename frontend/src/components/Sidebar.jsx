import { Link } from "react-router-dom";

function Sidebar() {

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    return (

        <div
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#001233",
                padding: "30px",
                color: "white"
            }}
        >

            <h1
                style={{
                    color: "#38bdf8",
                    marginBottom: "50px"
                }}
            >
                BankIQ
            </h1>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px"
                }}
            >

                <Link
                    to="/"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Dashboard
                </Link>

                <Link
                    to="/transactions"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Transactions
                </Link>

                <Link
                    to="/add"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Add
                </Link>

                <Link
                    to="/insights"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Insights
                </Link>

                <Link
                    to="/charts"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Charts
                </Link>

                <Link
                    to="/monthly"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Monthly
                </Link>

                <Link
                    to="/upload"
                    style={{
                        color: "white",
                        fontSize: "28px",
                        textDecoration: "none"
                    }}
                >
                    Upload
                </Link>

                <button

                    onClick={logout}

                    style={{

                        marginTop: "30px",

                        padding: "12px",

                        background: "#38bdf8",

                        border: "none",

                        borderRadius: "8px",

                        color: "white",

                        cursor: "pointer",

                        fontSize: "18px"

                    }}

                >

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;