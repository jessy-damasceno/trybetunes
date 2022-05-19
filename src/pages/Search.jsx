import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    isDisabled: false,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value });

    this.setState(({ searchInput }) => {
      const minChars = 2;
      return { isDisabled: searchInput.length >= minChars };
    });
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !isDisabled }
          >
            Pesquisar
          </button>
        </form>
        <p>Search</p>
      </div>
    );
  }
}

export default Search;
