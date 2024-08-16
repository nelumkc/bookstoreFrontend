import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function AddBook() {
  const [bookTitle, setOnChangeTitle] = useState(``);
  const [bookAuthor, setOnChangeAuthor] = useState(``);
  const [description, setOnChangeDescription] = useState(``);

  const onSubmit = (e) => {
    e.preventDefault();

    const book = { 
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      description: description
    };

    axios
      //.post(backend_url + '/books/add', book)
      .post(backend_url + '/api/v1/book', book)
      .then((res) => {
        window.location = '/';
      });
  };

  return (

    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-info float-lef">Show Book List</Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={bookTitle}
                  onChange={(e) => setOnChangeTitle(e.target.value)}
                  spellCheck="false"
                  data-ms-editor="true"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={bookAuthor}
                  onChange={(e) => setOnChangeAuthor(e.target.value)}
                  spellCheck="false"
                  data-ms-editor="true"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setOnChangeDescription(e.target.value)}
                  spellCheck="false"
                  data-ms-editor="true"
                  required
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
