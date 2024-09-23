import { React, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import AddBookForm from "./AddBookForm";
import BookList from "../components/BookList";





const Dashboard = () => {
    const [books, setBooks] = useState([
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Fiction",
        description: "A classic novel set in the Jazz Age, exploring themes of wealth, excess, and the American dream."
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction",
        description: "A novel about racial injustice in the Deep South, seen through the eyes of a young girl."
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian",
        description: "A dystopian novel depicting a totalitarian regime, surveillance, and control in a future society."
      },
      {
        id: 4,
        title: "Moby Dick",
        author: "Herman Melville",
        year: 1851,
        genre: "Adventure",
        description: "The tale of Captain Ahab's obsessive quest to kill the great white whale, Moby Dick."
      },
      {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        description: "A romantic novel that explores the manners and matrimonial machinations of British gentry in the early 19th century."
      },
    ]);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
  };

  const importBooks = (newBooks) => {
    setBooks([...books, ...newBooks]);
  };

  return (
    <div className="bg-gray-50 min-h-screen bg-custom-light-blue">
      <TopBar />
      <div className="container mx-auto py-8">
        <AddBookForm addBook={addBook} importBooks={importBooks} />
        {/* <BookList /> */}
      </div>
    </div>
  );
};

export default Dashboard;
