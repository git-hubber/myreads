import React, { Component } from 'react';

import './App.css'
import Routes from './Routes/Routes';
import { getAll, update } from './BooksAPI';

class BooksApp extends Component {
  state = {
    books: []
  }

  _fetchBooks = () => {
    getAll().then((books) => {
      this.setState({ books });
    });
  }

  _updateBooks = (id, shelf) => {
    update({ id }, shelf).then(this._fetchBooks);
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
