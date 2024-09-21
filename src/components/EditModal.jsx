import React from 'react';
import Modal from 'react-modal';

const EditBookModal = ({ isOpen, book, onClose, onEdit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onEdit({ ...book, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-custom-blue">Edit Book</h2>
        <button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      {book && (
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="year"
            placeholder="Publication Year"
            value={book.year}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <select
            name="status"
            value={book.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          >
            <option value="To Read">To Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-2">
              Cancel
            </button>
            <button
              onClick={() => {
                onEdit(book); // Ensure the updated status is included
                onClose();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditBookModal;
