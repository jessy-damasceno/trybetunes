import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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
        <form className="search_form">
          <input
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            type="text"
          />
          <SearchOutlinedIcon id="search_icon" color="success" fontSize="large" />
          <button
            id="search_button"
            type="button"
            data-testid="search-artist-button"
            disabled={ !isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
