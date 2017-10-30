import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { get as getBook } from '../BooksAPI';
import Loading from './Loading';

class BookPage extends Component {
  static propTypes = {
    updateBooks: PropTypes.func.isRequired
  }

  state = {
    book: {},
    loading: true
  }

  _onChange = (id, shelf) => {
    this.props.updateBooks(id, shelf);
    this.setState((prevState) => ({
      book: {
        ...prevState.book,
        shelf
      }
    }));
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getBook(id).then((book) => {
      this.setState({ book, loading: false });
    });
  }

  _renderBook() {
    const {
      id,
      authors,
      categories = [],
      description,
      imageLinks: {
        thumbnail
      },
      pageCount,
      previewLink,
      publishedDate,
      shelf,
      title
    } = this.state.book;

    const {
      history
    } = this.props;

    return (
      <div>
        <div className='book-page-title'>
          <span onClick={history.goBack} className="book-page-back" />
          <h1>{title}</h1>
        </div>
        <div className='book-page-content'>
          <div>
            <div className='book-page-content-container'>
              {authors && <h2 className='book-page-content-author'>
                {`by ${authors.join(', ')}`}
              </h2>}
              <div className="book-main-details">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select
                      onChange={(e) => {
                        this._onChange(id, e.target.value);
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
                <div className="book-description">{description}</div>
              </div>
              <div className="book-other-details">
              {categories && <span><span>Categories:</span> {`${categories.join(', ')}`}</span>}
              <span><span>Pages:</span> {pageCount}</span>
                <span><span>Published:</span> {publishedDate}</span>
              </div>
              {previewLink &&
              <div>
                <a href={previewLink} target='_blank'>Preview book</a>
              </div>
              }
            </div>
          </div>
        </div>
    </div>
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div className='books-page'>
        {loading ? <Loading /> : this._renderBook()}
      </div>
    );
  }
}

export default BookPage;
