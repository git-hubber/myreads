import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Book from './Book';

const Bookshelf = ({ books, updateBooks, title }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.length > 0 ?
          ( books.map((book) => (
            <Book
              key={book.id}
              book={book}
              updateBooks={updateBooks}
            />
          )) ) : (
            <p>The <strong>{title}</strong> shelf is empty. <Link to="/search">Add a book</Link></p>
          )
        }
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  updateBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Bookshelf; //
