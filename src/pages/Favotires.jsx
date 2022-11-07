import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    load: false,
  }

  async componentDidMount() {
    this.favoriteSongsList();
  }

  favoriteSongsList = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
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
    console.log(favoriteSongs);
  };

  render() {
    const { favoriteSongs, load } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>FAVORITES CONTEUDO</p>
        { load && <Loading /> }
        { favoriteSongs.map((obj, index) => (
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

export default Favorites;
