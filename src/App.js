import { BrowserRouter as Router ,Routes, Route, useNavigate} from "react-router-dom";
import {useState, useEffect } from "react";
import MyForm from "./form";
import Table from "./home";

const dataArr = [
  {
    "id": "1",
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "favoriteColor": "blue",
    "contactPreference": [
      "by email"
    ]
  },
  {
    "id": "2",
    "name": "Jane",
    "surname": "Smith",
    "email": "jane.smith@example.com",
    "age": 25,
    "favoriteColor": "green",
    "contactPreference": [
      "by phone call",
      "via SMS"
    ]
  },
  {
    "id": "3",
    "name": "Michael",
    "surname": "Johnson",
    "email": "michael.johnson@example.com",
    "age": 40,
    "favoriteColor": "red",
    "contactPreference": [
      "by email",
      "by phone call"
    ]
  }
]

function App() {
  const [data,setData]=useState(dataArr);
  return (
    <Router>
    <div className="App">
     
    </div>
    <Routes>
    <Route path='/' element={<Table data={data} setData={setData}/>} />
    <Route path='/form' element={<MyForm data={data} setData={setData}/>} />
    </Routes>
   
    </Router>
  );
}

export default App;
