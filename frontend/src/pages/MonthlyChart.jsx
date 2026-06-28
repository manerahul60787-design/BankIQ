import { useEffect, useState } from "react";
import axios from "axios";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";

function MonthlyChart(){

const [data,setData]=useState([]);

useEffect(()=>{

const fetchData=async()=>{

const token = localStorage.getItem("token");

const res = await axios.get(

"http://127.0.0.1:8000/transactions/monthly",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

const chartData = Object.entries(

res.data

).map(

([month,amount])=>({

month,
amount

})

);

setData(chartData);

};

fetchData();

},[]);

return(

<div style={{padding:"40px"}}>

<h1>

Monthly Analysis

</h1>

<ResponsiveContainer

width="100%"

height={400}

>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar

dataKey="amount"

fill="#2563eb"

/>

</BarChart>

</ResponsiveContainer>

</div>

);

}

export default MonthlyChart;