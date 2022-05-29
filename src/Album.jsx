import PropTypes from 'prop-types';
import React from 'react';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import getMusics from './services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    nomeDoAlbum: '',
    nomeDoArtista: '',
    load: false,
  }

  componentDidMount() {
    this.musicsOfAlbum();
  }

  musicsOfAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    // const { musics } = this.state;
    // const { id } = this.props.match.params;
    const result = await getMusics(id);
    this.setState({
      musics: [...result],
      nomeDoAlbum: result[0].collectionName,
      nomeDoArtista: result[0].artistName,
    });
  }

  // favoriteSong = async () => {
  //   const { match } = this.props;
  //   const { params } = match;
  //   const { id } = params;
  //   this.setState(
  //     { load: true },
  //     async () => {
  //       await addSong(await getMusics(id));
  //       // console.log(await addSong(await getMusics(id)));
  //       this.setState({ load: false });
  //     },
  //   );
  // }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { musics, nomeDoAlbum, nomeDoArtista, load } = this.state;
    musics.shift();
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
        { musics.map((obj, index) => (
          <MusicCard
            key={ index }
            trackname={ obj.trackName }
            previewUrl={ obj.previewUrl }
            trackId={ obj.trackId }
            // favoriteSong={ this.favoriteSong }
            load={ load }
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
