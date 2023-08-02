import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "./modal"
import './home.css';

const Table = ({data, setData}) => {
    const navigate = useNavigate()
    const[modalOpen,setModalOpen] = useState(false)
    const[exportOpen,setExportOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);


    const handleOpenModal = (rowId) => {
      setModalOpen(true)
     setSelectedRow(rowId)
    };
  
    const handleCloseModal = () => {
      setModalOpen(false)
    };
  
    const handleOk = () => {
      setData(data.filter((row) => row.id !== selectedRow));

    };
    const handleExportClick = () => {
      setExportOpen(true);
    };
   const handleCloseExport= () => {
    setExportOpen(false);
  };
   
    return (
        <>  
        <div className="table-buttons-div">
          <button className="create-button" onClick={()=>{navigate('/form')}}>Create New </button>
          <button className="export-button" onClick={handleExportClick}>Export</button>
          </div>
         <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Age</th>
            <th>Favorite color</th>
            <th>Contact preference</th>
            <th>Actions</th>
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
              <td>{d?.contactPreference.join(',')}</td>
              <td>
              <button className="delete-button" onClick={()=>{handleOpenModal(d?.id)}}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && <Modal isOpen={modalOpen} onClose={handleCloseModal} onOk={handleOk} />}
      {exportOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={handleCloseExport}>Close</button>
          </div>
        </div>
      )}
      </>
  
    )
}

export default Table