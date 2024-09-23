# Personal Book Collection - Frontend

This is the frontend of a full-stack application for managing a personal book collection. It is built using React and provides an interface for viewing, adding, editing, deleting, and importing books from a CSV file.

## Features

- Display a list of all books
- Add new books via a form
- Edit and delete existing books
- Export a CSV of existing books
- Search or filter books by title, author
- Upload a CSV file to import books into the collection
- Responsive design for desktop and mobile
- Dashboard for book statistics 


## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Abdul-Rehman67/BCS-Frontend
    cd BCS-Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

4. Your app will be running at `http://localhost:3000`.

## Pages and Components

### Pages
- **Home**: Displays the list of books.
- **Login**: Displays the list of books.
- **Create an Account**: Displays the list of books.
- **Add Book**: Form to add new books.
- **CSV Import**: Form to add books via CSV.

### Components
- **BookList**: Lists all books.
- **BookForm**: Form for adding and editing books.
- **SearchBar**: Search and filter books by title, author, or genre.
- **CSVUpload**: Upload interface for importing CSV files.
- **BookStatistics** : Displays statistics like the number of books in each read status.
- **Edit Book** : Displays statistics like the number of books in each read status.
- **Delete Book** : Displays statistics like the number of books in each read status.

## CSV Import Feature

You can upload a CSV file containing book data. The CSV must have the following columns:
- **Title**
- **Author**
- **Publication Year**
- **Genre**
- **Brief Description**

The uploaded books will be added to the database, and the import status will be displayed.

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **Axios** - For making HTTP requests to the backend API
- **React Router** - For navigation between pages
- **Tailwind CSS** - For basic styling (CSS framework optional)

## License

This project is licensed under the MIT License.
