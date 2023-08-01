import React from "react"
import { useNavigate } from "react-router-dom"

const Table = ({data}) => {
    const navigate = useNavigate()
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
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.surname}</td>
              <td>{data.email}</td>
              <td>{data.age}</td>
              <td>{data.favoriteColor}</td>
              <td>{data?.contactPreference}</td>
            </tr>
          ))}
        </tbody>
      </table></>
  
    )
}

export default Table