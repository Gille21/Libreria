import React from 'react';
import { Trash3, XCircle } from 'react-bootstrap-icons';
import '../styles/deleteConfirmation.css';

const DeleteConfirmation = ({ bookId, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(bookId);
    onClose(); // Cerrar el modal después de eliminar
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¿Estás seguro de que deseas eliminar este libro?</h2>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={handleDelete}>
            <Trash3 className="icon" /> Sí, eliminar
          </button>
          <button className="btn-cancel" onClick={onClose}>
            <XCircle className="icon" /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
