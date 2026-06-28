import { useEffect, useState } from "react";
import API from "../services/api";

function Insights() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    API.get(

      "/insights",

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    )

    .then((res) => {

      setMessage(

        res.data.message

      );

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  return (

    <div

      style={{

        padding: "40px"

      }}

    >

      <h1>

        AI Insights

      </h1>

      <div

        style={{

          marginTop: "30px",

          background: "white",

          padding: "30px",

          borderRadius: "12px",

          boxShadow:

            "0 0 10px rgba(0,0,0,0.1)"

        }}

      >

        <h2>

          {message}

        </h2>

      </div>

    </div>

  );

}

export default Insights;