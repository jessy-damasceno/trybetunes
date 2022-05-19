import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    searchInput: '',
    artistSearch: '',
    isDisabled: false,
    isLoading: false,
    albunsList: [],
    isClicked: false,
  }

  componentDidMount() {
    this.setState({ isClicked: false });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value });

    this.setState(({ searchInput }) => {
      const minChars = 2;
      return { isDisabled: searchInput.length >= minChars };
    });
  }

  handleClick = async () => {
    const { searchInput } = this.state;
    this.setState({ artistSearch: searchInput });
    this.setState({ searchInput: '', isLoading: true, isClicked: true });
    const albunsList = await searchAlbumsAPI(searchInput);
    this.setState({ isLoading: false, albunsList });
  }

  render() {
    const { searchInput, isDisabled, isLoading,
      albunsList, isClicked, artistSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="isLoading_container">
          {isLoading
            ? (
              <Loading />
            ) : (
              <form className="search_form">
                <div className="search_container">
                  <input
                    onChange={ this.handleChange }
                    data-testid="search-artist-input"
                    type="text"
                    value={ searchInput }
                  />
                  <SearchOutlinedIcon id="search_icon" color="success" fontSize="large" />
                </div>
                <button
                  id="search_button"
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ !isDisabled }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
            )}
        </div>
        <div className="album_list">
          {(isClicked && albunsList.length > 0) && (
            <>
              <p>
                Resultado de álbuns de:
                { ` ${artistSearch}` }
              </p>
              <div className="album_list_container">
                {albunsList.map(({ artistName,
                  artworkUrl100, collectionId, collectionName }, index) => (
                  (
                    <div
                      className="album_card"
                      key={ index }
                    >
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        <img src={ artworkUrl100 } alt={ `${artistName} album` } />
                        <h3>{ collectionName }</h3>
                        <h4>{ artistName }</h4>
                      </Link>
                    </div>
                  )))}
              </div>
            </>
          )}
          {(isClicked && albunsList.length === 0) && (<p>Nenhum álbum foi encontrado</p>)}
        </div>
      </div>
    );
  }
}

export default Search;
