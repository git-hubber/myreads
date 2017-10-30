import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

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

  _onChange = (shelf) => {
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
          <div className="book-top">
            <div
              onClick={this._goToBook}
              className="book-cover"
              style={{ width: 128, height: 192, backgroundImage: `url(${smallThumbnail})` }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(e) => {
                  this._onChange(e.target.value);
                }}
                value={shelf}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {authors && <div className="book-authors">{`by ${authors}`}</div>}
        </div>
      </li>
    );
  };
};

export default withRouter(Book);
