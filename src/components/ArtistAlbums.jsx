import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ArtistAlbums extends React.Component {
  render() {
    const { albumName, artistName, collectionId } = this.props;
    const albumLink = `/album/${collectionId}`;

    return (
      <div>
        <p>{albumName}</p>
        <p>{artistName}</p>
        <Link
          to={ albumLink }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionId }
        </Link>
      </div>
    );
  }
}

ArtistAlbums.propTypes = {
  albumName: propTypes.string.isRequired,
  artistName: propTypes.string.isRequired,
  collectionId: propTypes.string.isRequired,
};

export default ArtistAlbums;
