import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackname, previewUrl, song, checked, handleFavorite } = this.props;

    return (
      <div>
        <p>{trackname}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorita">
          <input
            name={ trackname }
            id={ song.trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${song.trackId}` }
            onChange={ () => handleFavorite(song) }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackname: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  song: propTypes.shape().isRequired,
  checked: propTypes.bool.isRequired,
  handleFavorite: propTypes.func.isRequired,
};
