import { BrowserRouter as Router ,Routes, Route, useNavigate} from "react-router-dom";
import {useState, useEffect } from "react";
import MyForm from "./form";
import Table from "./home";



function App() {
  const [data,setData]=useState([]);

  
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
      console.log(myJson);
      setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])


  return (
    <Router>
    <div className="App">
     
    </div>
    <Routes>
    <Route path='/' element={<Table data={data}/>} />
    <Route path='/form' element={<MyForm/>} />
    </Routes>
   
    </Router>
  );
}

export default App;
