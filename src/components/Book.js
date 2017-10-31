import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import BookInner from './BookInner';

class Book extends Component {
  static propTypes = {
    updateBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
  }

  state = {
    shelf: 'none'
  };

  _goToBook = () => {
    this.props.history.push(`/book/${this.props.book.id}`);
  }

  _onChange = (id, shelf) => {
    this.props.updateBooks(this.props.book.id, shelf);
    this.setState({ shelf });
  }

  componentDidMount() {
    this.setState({ shelf: this.props.book.shelf });
  }

  render() {
    const {
      book: {
        id,
        title,
        authors,
        imageLinks: {
          smallThumbnail
        }
      }
    } = this.props;

    const { shelf } = this.state;

    return (
      <li key={id}>
        <div className="book">
          <BookInner
            id={id}
            onClick={this._goToBook}
            onChange={this._onChange}
            thumbnail={smallThumbnail}
            shelf={shelf}
          />
          <div className="book-title">{title}</div>
          {authors && <div className="book-authors">{`by ${authors}`}</div>}
        </div>
      </li>
    );
  };
};

export default withRouter(Book);
