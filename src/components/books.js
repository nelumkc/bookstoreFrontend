import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//const backend_url = process.env.REACT_APP_BACKEND_URL;
const backend_url = "https://newbookstore-backend-bry287q4p-nelums-projects.vercel.app";

const NavBar = () => (
  <div>
    <div className="col-md-12">
      <br />
      <h2 className="display-4 text-center">Books List</h2>
    </div>
    <div className="col-md-11">
      <Link to="/create-book" className="btn btn-info float-right">
        + Add New Book
      </Link>
      <br />
      <br />
      <hr />
    </div>
  </div>
);

const Book = (props) => (

  <div className="card-container">
    <img
      src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
      alt="Books"
      height="200"
    />
    <div className="desc">
      <h2><a href="#" onClick={() => { props.editBook(props.keyt); }}>{props.bookTitle}</a></h2>
      <h3>{props.bookAuthor}</h3>
      <p>{props.description}
        <button className='btn btn-danger delete' onClick={() => { props.deleteBook(props.keyt); }}>X</button>
      </p>
    </div>
  </div>

);

export default function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(backend_url + '/api/v1/book')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(backend_url);
        console.log(error.response.data);
      });
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(backend_url + '/api/v1/book' + id)
      .then((response) => {
        console.log(response.data);
      });

    setBooks(books.filter((book) => book._id !== id));
  };

  
  const editBook = (id) => {
    window.location = '/update/' + id;
  };

  return (
    <div className='BookList'>

      <NavBar />

      <div className="list">

        {books.map((book) => {
          return (
            <Book
              bookTitle={book.bookTitle}
              bookAuthor={book.bookAuthor}
              description={book.description}
              key={book._id}
              keyt={book._id}
              deleteBook={deleteBook}
              editBook={editBook}
            />
          );
        })}

      </div>

    </div>
  );
}
