import React from 'react';
import Modal from 'react-modal';

const DeleteBookModal = ({ isOpen, book, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-custom-blue">Confirm Deletion</h2>
        <button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <p>Are you sure you want to delete "{book?.title}"?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;
