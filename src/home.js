import React from "react"
import { useNavigate } from "react-router-dom"

const Table = ({data, setData}) => {
    const navigate = useNavigate()

    const handleDeleteRow = (id) => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    };
    return (
        <>  
          <button onClick={()=>{navigate('/form')}}>Open form</button>
         <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Age</th>
            <th>Favorite color</th>
            <th>Contact preference</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((d, id) => (
            <tr key={id}>
              <td>{d.name}</td>
              <td>{d.surname}</td>
              <td>{d.email}</td>
              <td>{d.age}</td>
              <td>{d.favoriteColor}</td>
              <td>{d?.contactPreference}</td>
              <td>
              <button onClick={() => handleDeleteRow(d.id)}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table></>
  
    )
}

export default Table