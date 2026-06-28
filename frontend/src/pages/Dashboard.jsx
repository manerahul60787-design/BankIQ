import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [summary, setSummary] = useState({

        income: 0,

        expense: 0,

        balance: 0

    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        API.get(

            "/transactions/summary",

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        )

        .then((res) => {

            setSummary(

                res.data

            );

        })

        .catch(

            console.log

        );

    }, []);


    return (

        <div

            style={{

                padding: "40px",

                background: "#f5f7fa",

                minHeight: "100vh"

            }}

        >

            <h1>

                BankIQ Dashboard

            </h1>

            <p

                style={{

                    color: "#666",

                    fontSize: "18px",

                    marginTop: "10px"

                }}

            >

                Track expenses,

                monitor income,

                and analyze financial habits.

            </p>


            <div

                style={{

                    display: "flex",

                    gap: "20px",

                    marginTop: "40px",

                    flexWrap: "wrap"

                }}

            >

                <div

                    style={{

                        background: "white",

                        minWidth: "250px",

                        padding: "25px",

                        borderRadius: "12px",

                        boxShadow:

                            "0 0 10px rgba(0,0,0,0.1)",

                        transition: "0.3s"

                    }}

                >

                    <h3>

                        Total Income

                    </h3>

                    <h2

                        style={{

                            color: "green"

                        }}

                    >

                        ₹{summary.income}

                    </h2>

                </div>



                <div

                    style={{

                        background: "white",

                        minWidth: "250px",

                        padding: "25px",

                        borderRadius: "12px",

                        boxShadow:

                            "0 0 10px rgba(0,0,0,0.1)",

                        transition: "0.3s"

                    }}

                >

                    <h3>

                        Total Expense

                    </h3>

                    <h2

                        style={{

                            color: "red"

                        }}

                    >

                        ₹{summary.expense}

                    </h2>

                </div>



                <div

                    style={{

                        background: "white",

                        minWidth: "250px",

                        padding: "25px",

                        borderRadius: "12px",

                        boxShadow:

                            "0 0 10px rgba(0,0,0,0.1)",

                        transition: "0.3s"

                    }}

                >

                    <h3>

                        Balance

                    </h3>

                    <h2

                        style={{

                            color: "#2563eb"

                        }}

                    >

                        ₹{summary.balance}

                    </h2>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;