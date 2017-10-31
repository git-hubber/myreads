import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { search } from '../BooksAPI';
import Book from './Book';
import Loading from './Loading';

class SearchBooksPage extends Component {
  static propTypes = {
    updateBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
    searchTerm: '',
    books: [],
    searchState: 0, // 0 - no search, 1 - searching, 2 - searched
  }

  _doSearch = _.debounce((searchTerm) => {
    const bookState = this.props.books;
    const trimSearchTerm = searchTerm.trim();

    if (trimSearchTerm.length >= 3) {
      this.setState({ searchState: 1 });
      search(trimSearchTerm, 20).then((result) => {
        let results = [];
        this.setState({ searchState: 2 });

        if (result.length) {
          result.forEach((book) => {
            let shelf = 'none';
            bookState.map((b) => b.id === book.id ? shelf = b.shelf : '');
            book.shelf = shelf;
            results.push(book);
          });
        }
        this.setState({ books: results });
      });
    } else {
      this.setState({ searchState: 0 });
    }
  }, 500);

  _onChange = (searchTerm) => {
    this.setState({ searchTerm });
    this._doSearch(searchTerm);
  }

  render() {
    const {
      books,
      searchTerm,
      searchState
    } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this._doSearch(searchTerm);
              }}
            >
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this._onChange(e.target.value)}
                value={searchTerm}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
            {searchState === 1 && <Loading />}
            {searchState === 2 && books.length > 0  ? (
              <ol className="books-grid">
                {books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateBooks={this.props.updateBooks}
                  />
                ))}
              </ol>
            ) : (
              searchTerm.trim().length < 3 ? (
                <p>Please enter 3 or more characters to search...</p>
              ) : (
                searchState === 2 && <p>No results for <strong>{searchTerm}</strong></p>
              )
            )}
        </div>
      </div>
    );
  };
};

export default SearchBooksPage;
