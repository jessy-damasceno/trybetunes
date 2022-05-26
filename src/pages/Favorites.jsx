import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteSongsList: [],
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    // this.setState({ isLoading: false });
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      isLoading: true,
      favoriteSongsList,
    });
  }

  render() {
    // const { favoriteSongsList, isLoading } = this.state;
    const { favoriteSongsList, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {!isLoading ? <Loading /> : (
          favoriteSongsList.map((musica, index) => (
            <MusicCard
              key={ index }
              trackName={ musica.trackName }
              trackId={ musica.trackId }
              previewUrl={ musica.previewUrl }
              isFavorite
              getFavoriteSongsList={ this.getFavoriteSongsList }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
