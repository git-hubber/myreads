import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Routes from './Routes/Routes';
import { getAll, update } from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  _fetchBooks = () => {
    let stateBooks = [];

    getAll().then((books) => {
      books.map((book) => stateBooks.push(book));
      this.setState({ books: stateBooks });
    });
  }

  _updateBooks = (id, shelf) => {
    update({ id }, shelf).then(this._fetchBooks());
  }

  componentDidMount() {
    this._fetchBooks();
  }

  render() {
    const {
      books
    } = this.state;

    return (
      <div className="app">
        <Routes books={books} updateBooks={this._updateBooks} />
      </div>
    )
  }
}

export default BooksApp
