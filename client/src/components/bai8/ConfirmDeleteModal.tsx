import React from 'react';
import "./confirmDeleteModal.css"
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Hủy</button>
          <button onClick={onConfirm}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;