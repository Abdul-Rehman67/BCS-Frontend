import React, { useEffect, useState } from 'react';
import EditBookModal from '../components/EditModal';
import DeleteBookModal from '../components/DeleteModal';
import './BookList.css';
import axios from '../apis/axios';
import { GET_ALL_BOOKS } from '../apis/apiRoutes';

const BookList = ({ onDelete, onEdit,refreshlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editBook, setEditBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshList, setRefresh] = useState([]);

  useEffect(()=>{
    getBookByUser()
  },[refreshlist])
  const getBookByUser = async ()=>{
    console.log("getBookByUser")
    try{       
        let response = await axios.get(GET_ALL_BOOKS);
        console.log("response",response)
        setBooks(response.data.payload)
    }
    catch(e){
        console.log(e)

    }
    
  }

  const handleEditClick = (book) => setEditBook(book);
  const handleDeleteClick = (book) => setBookToDelete(book);

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export books as CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Title', 'Author', 'Year', 'Genre', 'Description', 'Status'],
      ...filteredBooks.map(book => [
        book.title,
        book.author,
        book.year,
        book.genre,
        book.description,
        book.status
      ])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'book_collection.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-10 h-[800px] overflow-y-scroll">
      <h2 className="text-2xl font-bold text-custom-blue mb-6 text-center">My Book Collection</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          onClick={exportToCSV}
          disabled={books.length<1}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Export as CSV
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-center">{!loading ? 'No books available. Please add books to your collection.':'Please wait...'}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks?.map((book) => (
            <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
              <img
                src={`https://via.placeholder.com/300x450.png?text=${book.title.split(' ').join('+')}`}
                alt={book.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-custom-blue mb-1">{book.title}</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Year:</strong> {book.year}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Genre:</strong> {book.genre}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {book.status}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {book.description}</p>
              </div>

              <div className="flex justify-end space-x-2 mb-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleEditClick(book)}
                  className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full hover:bg-yellow-600"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(book)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <EditBookModal
  isOpen={!!editBook}
  book={editBook}
  onClose={() => {
    setEditBook(null); // Close modal
  }}
  onEdit={(updatedBook) => {
    // Call the parent onEdit function to refresh the list
    getBookByUser(); // Ensure this is called to refresh the book list after edit
    setEditBook(null); // Clear the current editBook state
  }}
/>


<DeleteBookModal
  isOpen={!!bookToDelete}
  book={bookToDelete}
  onClose={() => setBookToDelete(null)}  // Close the modal
  onDelete={(bookId) => {
    // This will be called after the book is successfully deleted
    console.log(`Deleted book with ID: ${bookId}`);
    // You can refresh your book list here
    getBookByUser();  // Assuming this is the function that fetches all books
    setBookToDelete(null);  // Clear the bookToDelete state
  }}
/>

    </div>
  );
};

export default BookList;
