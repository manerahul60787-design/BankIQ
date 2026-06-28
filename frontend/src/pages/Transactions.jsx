import { useEffect, useState } from "react";
import API from "../services/api";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({

        description: "",

        category: "",

        type: "",

        amount: ""

    });

    const fetchTransactions = () => {

        const token = localStorage.getItem("token");

        API.get(

            "/transactions/all",

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        )

        .then((res) => {

            setTransactions(

                res.data

            );

        })

        .catch(

            console.log

        );

    };


    useEffect(() => {

        fetchTransactions();

    }, []);



    const deleteTransaction = (id) => {

        const token = localStorage.getItem("token");

        API.delete(

            `/transactions/${id}`,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        )

        .then(() => {

            fetchTransactions();

        })

        .catch(

            console.log

        );

    };



    const editTransaction = (t) => {

        setEditingId(

            t.id

        );

        setForm({

            description:

                t.description,

            category:

                t.category,

            type:

                t.type,

            amount:

                t.amount

        });

    };



    const updateTransaction = () => {

        const token = localStorage.getItem("token");

        API.put(

            `/transactions/${editingId}`,

            form,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        )

        .then(() => {

            setEditingId(

                null

            );

            fetchTransactions();

        })

        .catch(

            console.log

        );

    };



    return (

        <div

            style={{

                padding:

                    "40px"

            }}

        >

            <h1>

                Transactions

            </h1>


            <input

                placeholder="Search"

                value={search}

                onChange={(e) =>

                    setSearch(

                        e.target.value

                    )

                }

                style={{

                    padding:

                        "10px",

                    width:

                        "300px",

                    marginBottom:

                        "20px"

                }}

            />


            {

                editingId && (

                    <div

                        style={{

                            marginBottom:

                                "30px",

                            display:

                                "flex",

                            gap:

                                "10px"

                        }}

                    >

                        <input

                            value={

                                form.description

                            }

                            placeholder="Description"

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    description:

                                        e.target.value

                                })

                            }

                        />


                        <input

                            value={

                                form.category

                            }

                            placeholder="Category"

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    category:

                                        e.target.value

                                })

                            }

                        />


                        <input

                            value={

                                form.type

                            }

                            placeholder="Type"

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    type:

                                        e.target.value

                                })

                            }

                        />


                        <input

                            value={

                                form.amount

                            }

                            placeholder="Amount"

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    amount:

                                        e.target.value

                                })

                            }

                        />


                        <button

                            onClick={

                                updateTransaction

                            }

                        >

                            Update

                        </button>

                    </div>

                )

            }


            <table

                style={{

                    width:

                        "100%",

                    borderCollapse:

                        "collapse",

                    marginTop:

                        "20px"

                }}

            >

                <thead>

                    <tr>

                        <th>

                            Description

                        </th>

                        <th>

                            Category

                        </th>

                        <th>

                            Type

                        </th>

                        <th>

                            Amount

                        </th>

                        <th>

                            Action

                        </th>

                    </tr>

                </thead>


                <tbody>

                    {

                        transactions

                        .filter(

                            (t) =>

                                t.description

                                .toLowerCase()

                                .includes(

                                    search.toLowerCase()

                                )

                                ||

                                t.category

                                .toLowerCase()

                                .includes(

                                    search.toLowerCase()

                                )

                        )

                        .map(

                            (t) => (

                                <tr

                                    key={

                                        t.id

                                    }

                                >

                                    <td>

                                        {

                                            t.description

                                        }

                                    </td>

                                    <td>

                                        {

                                            t.category

                                        }

                                    </td>

                                    <td>

                                        {

                                            t.type

                                        }

                                    </td>

                                    <td>

                                        ₹{

                                            t.amount

                                        }

                                    </td>


                                    <td>

                                        <button

                                            onClick={() =>

                                                editTransaction(

                                                    t

                                                )

                                            }

                                            style={{

                                                background:

                                                    "blue",

                                                color:

                                                    "white",

                                                border:

                                                    "none",

                                                padding:

                                                    "8px",

                                                borderRadius:

                                                    "5px",

                                                marginRight:

                                                    "10px"

                                            }}

                                        >

                                            Edit

                                        </button>


                                        <button

                                            onClick={() =>

                                                deleteTransaction(

                                                    t.id

                                                )

                                            }

                                            style={{

                                                background:

                                                    "red",

                                                color:

                                                    "white",

                                                border:

                                                    "none",

                                                padding:

                                                    "8px",

                                                borderRadius:

                                                    "5px"

                                            }}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Transactions;