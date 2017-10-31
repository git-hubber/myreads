import React from 'react';
import PropTypes from 'prop-types';

const BookInner = ({ id, thumbnail, onChange, onClick, shelf }) => (
  <div className="book-top">
    <div
      className="book-cover"
      style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail})` }}
      onClick={onClick}
    />
    <div className="book-shelf-changer">
      <select
        onChange={(e) => {
          onChange(id, e.target.value);
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
);

BookInner.defaultProps = {
  onClick: () => {} // BookPage doesn't require an onClick handler
}

BookInner.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
}

export default BookInner;
