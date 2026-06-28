import { useState } from "react";
import API from "../services/api";

function Upload() {

const [file,setFile]=useState(null);

const [message,setMessage]=useState("");

const uploadFile = async()=>{

if(!file){

alert("Select CSV file");

return;

}

const formData = new FormData();

formData.append(

"file",

file

);

const token = localStorage.getItem(

"token"

);

try{

const response = await API.post(

"/upload/csv",

formData,

{

headers:{

Authorization:`Bearer ${token}`,

"Content-Type":"multipart/form-data"

}

}

);

setMessage(

response.data.message

);

}

catch(err){

console.log(err);

}

};


const downloadCSV = ()=>{

window.open(

"http://127.0.0.1:8000/transactions/export"

);

};


return(

<div style={{padding:"40px"}}>

<h1>

CSV Upload

</h1>

<input

type="file"

accept=".csv"

onChange={(e)=>{

setFile(

e.target.files[0]

)

}}

/>

<br/>

<br/>

<button

onClick={uploadFile}

style={{

padding:"10px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"8px",

marginRight:"15px"

}}

>

Upload CSV

</button>


<button

onClick={downloadCSV}

style={{

padding:"10px",

background:"green",

color:"white",

border:"none",

borderRadius:"8px"

}}

>

Download CSV

</button>


<br/>

<br/>

<p>

{message}

</p>

</div>

);

}

export default Upload;