import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../apis/axios';  // Assuming this is where DELETE_BOOK is coming from
import { DELETE_BOOK } from '../apis/apiRoutes';  // Import your DELETE_BOOK API route

const DeleteBookModal = ({ isOpen, book, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);

  // Renamed this function to avoid conflict with onDelete prop
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${DELETE_BOOK}/${book._id}`);
      console.log('book response', response);

      if (response.data.success) {
        alert(response.data.message);
        onDelete(book._id); // Call the onDelete prop after successful deletion
        setLoading(false);
        onClose(); // Close modal only after successful delete
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
          onClick={handleDelete} // Use handleDelete here instead of onConfirm
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;
