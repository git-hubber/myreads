import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import ListBooksPage from '../components/ListBooksPage';
import SearchBooksPage from '../components/SearchBooksPage';
import BookPage from '../components/BookPage';

const Routes = ({updateBooks, books}) => (
  <BrowserRouter>
    <div>
      <Route exact path='/' render={() => (
        <ListBooksPage updateBooks={updateBooks} books={books}/>
      )}/>
      <Route path='/search' render={() => (
        <SearchBooksPage updateBooks={updateBooks} books={books} />
      )}/>
      <Route path='/book/:id' render={(props) => (
        <BookPage updateBooks={updateBooks} {...props} />
      )}/>
    </div>
  </BrowserRouter>
);

Routes.propTypes = {
  updateBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Routes;
