import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../apis/axios';  
import { DELETE_BOOK } from '../apis/apiRoutes';  

const DeleteBookModal = ({ isOpen, book, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${DELETE_BOOK}/${book._id}`);
      console.log('book response', response);

      if (response.data.success) {
        alert(response.data.message);
        onDelete(book._id); 
        setLoading(false);
        onClose(); 
      } else {
        setLoading(false);
        alert(response.data.message);
      }
    } catch (e) {
      setLoading(false);
      alert('An error occurred while deleting the book.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-custom-blue">
          {!loading ? 'Confirm Deletion' : 'Please wait...'}
        </h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
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
          onClick={handleDelete} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          disabled={loading}  
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;
