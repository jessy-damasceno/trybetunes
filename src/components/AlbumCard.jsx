import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    const { artistName, artworkUrl100, collectionId, collectionName } = album;
    return (
      <div
        className="album_card"
      >
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ `${artistName} album` } />
          <h4>{ collectionName }</h4>
          <h5>{ artistName }</h5>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
