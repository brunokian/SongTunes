import PropTypes from 'prop-types';
import React from 'react';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong, addSong } from './services/favoriteSongsAPI';
import getMusics from './services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    nomeDoAlbum: '',
    nomeDoArtista: '',
    load: false,
    favoriteSongs: [],
  }

  async componentDidMount() {
    this.musicsOfAlbum();
    this.setState({ load: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, load: false });
  }

  favoriteChecked = (music) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((item) => (item.trackId === music.trackId));
  }

  updateFavorites = async (music) => {
    this.setState({ load: true });
    if (this.favoriteChecked(music)) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, load: false });
  };

  musicsOfAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      musics: result.slice(1),
      nomeDoAlbum: result[0].collectionName,
      nomeDoArtista: result[0].artistName,
    });
  }

  render() {
    const { musics, nomeDoAlbum, nomeDoArtista, load } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>ALBUM CONTEUDO</p>
        { (
          <div>
            <p
              data-testid="artist-name"
            >
              { nomeDoArtista }
            </p>
            <p
              data-testid="album-name"
            >
              { nomeDoAlbum }
            </p>
          </div>) }
        { load && <Loading /> }
        { musics.map((obj, index) => (
          <MusicCard
            key={ index }
            trackname={ obj.trackName }
            previewUrl={ obj.previewUrl }
            song={ obj }
            load={ load }
            checked={ this.favoriteChecked(obj) }
            handleFavorite={ this.updateFavorites }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
