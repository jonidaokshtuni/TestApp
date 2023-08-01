import React, { useState } from 'react';

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
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to proceed?</p>
        <div className="modal-buttons">
          <button onClick={handleOkClick}>Ok</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
