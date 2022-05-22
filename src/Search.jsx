import React from 'react';
import Header from './components/Header';

class Search extends React.Component {
  state = {
    inputText: '',
    buttonHasBlocked: true,
  }

  aqui = () => { console.log('teste'); }

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
    const { inputText, buttonHasBlocked } = this.state;

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
          onClick={ this.aqui }
          disabled={ buttonHasBlocked }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
        <p>search componente</p>
      </div>
    );
  }
}

export default Search;
