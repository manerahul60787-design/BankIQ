import { useState } from "react";
import API from "../services/api";

function AddTransaction() {

    const [form, setForm] = useState({

        amount: "",

        category: "",

        description: "",

        type: "Expense"

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    const submit = async () => {

        const token = localStorage.getItem("token");

        try {

            await API.post(

                "/transactions/add",

                form,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert(

                "Transaction Added Successfully"

            );

            setForm({

                amount: "",

                category: "",

                description: "",

                type: "Expense"

            });

        }

        catch (err) {

            console.log(err);

            alert(

                "Failed to Add Transaction"

            );

        }

    };


    return (

        <div

            style={{

                padding: "40px"

            }}

        >

            <h1>

                Add Transaction

            </h1>


            <input

                name="description"

                value={form.description}

                placeholder="Description"

                onChange={handleChange}

                style={{

                    padding: "10px",

                    width: "300px"

                }}

            />

            <br /><br />


            <input

                name="category"

                value={form.category}

                placeholder="Category"

                onChange={handleChange}

                style={{

                    padding: "10px",

                    width: "300px"

                }}

            />

            <br /><br />


            <input

                name="amount"

                value={form.amount}

                placeholder="Amount"

                onChange={handleChange}

                style={{

                    padding: "10px",

                    width: "300px"

                }}

            />

            <br /><br />


            <select

                name="type"

                value={form.type}

                onChange={handleChange}

                style={{

                    padding: "10px",

                    width: "320px"

                }}

            >

                <option>

                    Expense

                </option>

                <option>

                    Income

                </option>

            </select>

            <br /><br />


            <button

                onClick={submit}

                style={{

                    padding: "12px",

                    background: "#2563eb",

                    color: "white",

                    border: "none",

                    borderRadius: "8px",

                    cursor: "pointer"

                }}

            >

                Add Transaction

            </button>

        </div>

    );

}

export default AddTransaction;