import React from 'react';
import Header from '../components/Header';
// import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    // isLoading: false,
    favoriteSongsList: [],
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    // this.setState({ isLoading: false });
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      // isLoading: true,
      favoriteSongsList,
    });
  }

  render() {
    // const { favoriteSongsList, isLoading } = this.state;
    const { favoriteSongsList } = this.state;
    console.log(favoriteSongsList);
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongsList.map(({ trackName, previewUrl, trackId }, index) => ((
          <MusicCard
            key={ index }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            isFavorite
          />
        )))}
      </div>
    );
  }
}

export default Favorites;
