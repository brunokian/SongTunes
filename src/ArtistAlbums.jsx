import React from 'react';

class ArtistAlbums extends React.Component {
  state = {
    albumName: '',
    artistName:'',
  }

  render() {
    const { searchResult, hasSearch } = this.props;

    searchResult.map = (obj) => {
      this.setState({ albumName: obj.collectionName, artistName: obj.artistName})
    }

    return (
      <div>
        <p>teste</p>
        { hasSearch ? <p>lista aqui</p> : <p>nao encontrado</p> }
      </div>
    );
  }
}

export default ArtistAlbums;
