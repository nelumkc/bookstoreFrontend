import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function EditBook() {

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const [bookTitle, setOnChangeTitle] = useState(``);
  const [bookAuthor, setOnChangeAuthor] = useState(``);
  const [description, setOnChangeDescription] = useState(``);

  useEffect(() => {
    axios
      .get(`${backend_url}/book/${id}`)
      .then((response) => {
        setOnChangeTitle(response.data.bookTitle);
        setOnChangeAuthor(response.data.bookAuthor);
        setOnChangeDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const book = { 
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      description: description
    };

    console.log(book);

    console.log(`${backend_url}/book/${id}`);

    axios
      .post(`${backend_url}/books/${id}`, book)
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
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Edit book</p>
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
