import React, { Component } from 'react';
import propTypes from 'prop-types';
import Loading from '../Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    load: false,
  };

  favoriteSongCheck = async () => {
    const { trackId } = this.props;
    // const music = { trackId };
    this.setState(
      { load: true },
      async () => {
        await addSong(trackId);
        // console.log(await addSong(await getMusics(id)));
        this.setState({ load: false });
      },
    );
  };

  render() {
    const { trackname, previewUrl, trackId } = this.props;

    const { load } = this.state;

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
        { load && <Loading /> }
        <label htmlFor="favorita">
          <input
            name={ trackname }
            id="favorita"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.favoriteSongCheck }
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
  trackId: propTypes.number.isRequired,
};
