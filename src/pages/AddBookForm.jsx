import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from '../apis/axios'
import { ADD_BOOK } from '../apis/apiRoutes';
const AddBookForm = ({ addBook, importBooks }) => {
  const [activeTab, setActiveTab] = useState('form');
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    description: ''
  });
  const [csvFile, setCsvFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.values(book).some((value) => value === "")) {
      alert("All fields are required");
      return;
    }

    // Wrap the book object in an array
    const bookPayload = [book];
    console.log(bookPayload)

    try {
        setLoading(true)
      const response = await axios.post(ADD_BOOK, {
        payload: bookPayload,
      });
      console.log("book response",response)
      if(response.data.success){
        setLoading(false)
        alert(response.data.message)
        setBook({ title: '', author: '', year: '', genre: '', description: '' }); 
      }
      else{
        setLoading(false)

        alert(response.data.message)
      }

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log('Book added successfully:', data);
    //     addBook(bookPayload); 
    //     setBook({ title: '', author: '', year: '', genre: '', description: '' }); // Reset form
    //   } else {
    //     // Handle error response
    //     alert(data.message || 'Error adding book');
    //   }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the book.');
    }
  };
 const handleSubmitByCSV = async (bookPayload)=>{
    try{

        setLoading(true)
        const response = await axios.post(ADD_BOOK, {
          payload: bookPayload,
        });
        console.log("book response",response)
        if(response.data.success){
          setLoading(false)
          alert(response.data.message)
        }
        else{
          setLoading(false)
    
          alert(response.data.message)
        }
    }
     catch(e){
        alert('An error occurred while adding the book.');
     }

 }

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCSVUpload = async(e) => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
        const books = results.data.map((book, index) => ({
            id: index + 1,
            title: book.Title,
            author: book.Author,
            year: book.Year,
            genre: book.Genre,
            description: book.Description,
          }));
        console.log("book",books)
        handleSubmitByCSV(books)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
    else{
        alert('Please upload correct file') 
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCsvFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Tabs for switching between Form and CSV upload */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('form')}
          className={`p-2 rounded-t-lg w-1/2 ${activeTab === 'form' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
        >
          Add Book by Form
        </button>
        <button
          onClick={() => setActiveTab('csv')}
          className={`p-2 rounded-t-lg w-1/2 ${activeTab === 'csv' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
        >
          Add Books by CSV
        </button>
      </div>

      {/* Container with fixed height */}
      <div className="min-h-[400px] flex flex-col justify-between">
        {/* Form to Add Book */}
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="mb-4">
              <label className="block text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Year</label>
              <input
                type="number"
                name="year"
                value={book.year}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Genre</label>
              <input
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Description</label>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600">
            {loading? 'Please wait...' : 'Add Book'}
            </button>
          </form>
        )}

        {/* Fancy CSV Upload */}
        {activeTab === 'csv' && (
          <div className="flex-1">
            <div className="mb-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed p-8 rounded-lg text-center transition-all duration-300 ${dragActive ? 'border-custom-blue bg-blue-50' : 'border-gray-300'}`}
              >
                <p className="text-gray-700 mb-2">Drag & Drop your CSV file here, or</p>
                <label className="cursor-pointer bg-blue-400 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-600 transition-colors">
                  Browse File
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {csvFile && <p className="text-sm text-gray-500 mt-2">File Selected: {csvFile.name}</p>}
            </div>
            <button
              onClick={handleCSVUpload}
              className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Import Books from CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBookForm;
