import React, { useState } from 'react';
import "./modal.css"

const Modal = ({ isOpen, onClose, onOk }) => {
  if (!isOpen) return null;

  const handleOkClick = () => {
    onOk();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="confirmation-dialog" id="confirmationDialog">
      <div className="dialog-content">
      <span class="close-button" onClick={handleCancelClick}>&times;</span>
        <p>Are you sure you want to proceed?</p>
        <div className="buttons">
          <button className="confirm-button" onClick={handleOkClick}>Ok</button>
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
