import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Bookshelf from './Bookshelf';
import Loading from './Loading';

const ListBooksPage = ({ books, updateBooks }) => {
  const shelves = [
    {
      name: `currentlyReading`,
      heading: `Currently Reading`
    },
    {
      name: `wantToRead`,
      heading: `Want to Read`
    },
    {
      name: `read`,
      heading: `Read`
    }
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          { books.length === 0 ? <Loading /> :
            (
              shelves.map((shelf, index) => (
                <Bookshelf
                  title={shelf.heading}
                  key={index}
                  books={books.filter((book) => book.shelf === shelf.name)}
                  updateBooks={updateBooks}
                />
              ))
            )
          }
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ListBooksPage.propTypes = {
  updateBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}
export default ListBooksPage;
