import React from 'react';
import Header from './components/Header';
import Loading from './Loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import ArtistAlbums from './ArtistAlbums';

class Search extends React.Component {
  state = {
    inputText: '',
    buttonHasBlocked: true,
    load: false,
    hasSearch: false,
    searchResult: [],
  }

  searchArtist = async () => {
    const { inputText } = this.state;
    this.setState(
      { load: true },
      async () => {
        const result = await searchAlbumsAPI(inputText);
        this.setState({
          load: false,
          inputText: '',
          hasSearch: true,
          searchResult: result,
        });
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
    const { inputText, buttonHasBlocked, load, searchResult, hasSearch } = this.state;

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
        { load ? <Loading /> : <ArtistAlbums
          searchResult={ searchResult }
          hasSearch={ hasSearch }
        /> }
      </div>
    );
  }
}

export default Search;
