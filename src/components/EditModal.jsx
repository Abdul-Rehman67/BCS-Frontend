import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from '../apis/axios';
import { UPDATE_BOOK } from '../apis/apiRoutes';

const EditBookModal = ({ isOpen, book, onClose, onEdit }) => {
  const [editedBook, setEditedBook] = useState({ ...book });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setEditedBook({ ...book });
    }
  }, [book]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log('Updated book:', editedBook);
    try {
      setLoading(true);
      const response = await axios.post(UPDATE_BOOK, {
        payload: editedBook,
      });
      console.log('book response', response);

      if (response.data.success) {
        alert(response.data.message);
        onEdit(editedBook); // Call onEdit after successful update
        setLoading(false);
        onClose(); // Close modal only after successful update
      } else {
        setLoading(false);
        alert(response.data.message);
      }
    } catch (e) {
      setLoading(false);
      alert('An error occurred while updating the book.');
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
        <h2 className="text-2xl font-bold text-custom-blue">Edit Book</h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      {editedBook && (
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editedBook.title}
            disabled={true}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-200"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={editedBook.author}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="year"
            placeholder="Publication Year"
            value={editedBook.year}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={editedBook.genre}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editedBook.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <select
            name="status"
            value={editedBook.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          >
            <option value="To Read">To Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditBookModal;
