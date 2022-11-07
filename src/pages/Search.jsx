import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ArtistAlbums from '../components/ArtistAlbums';

class Search extends React.Component {
  state = {
    inputText: '',
    test: '',
    buttonHasBlocked: true,
    load: false,
    hasSearch: true,
    searchResult: [],
  }

  searchArtist = async () => {
    const { inputText } = this.state;
    this.setState(
      { load: true, test: inputText },
      async () => {
        const result = await searchAlbumsAPI(inputText);
        this.setState({
          load: false,
          inputText: '',
          hasSearch: true,
          searchResult: result,
        });
        if (result.length === 0) {
          this.setState({ hasSearch: false });
          console.log(result);
        }
      },
    );
  }

  validation = () => {
    const { inputText } = this.state;
    const minimumCaracteres = 2;
    if (inputText.length < minimumCaracteres) {
      this.setState({ buttonHasBlocked: true });
    } else {
      this.setState({ buttonHasBlocked: false });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validation);
  }

  render() {
    const {
      inputText, buttonHasBlocked, load, searchResult, hasSearch, test } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          id="inputText"
          name="inputText"
          type="text"
          value={ inputText }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />
        <button
          id="botao-pesquisa"
          name="botao-pesquisa"
          type="submit"
          onClick={ this.searchArtist }
          disabled={ buttonHasBlocked }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
        <p>
          Resultado de álbuns de:
          {' '}
          {test}
        </p>
        { hasSearch ? null : <p>Nenhum álbum foi encontrado</p> }
        { load ? <Loading /> : searchResult.map((obj) => (
          <ArtistAlbums
            key={ obj.collectionId }
            albumName={ obj.collectionName }
            artistName={ obj.artistName }
            collectionId={ obj.collectionId }
            search={ inputText }
          />
        )) }
      </div>
    );
  }
}

export default Search;
