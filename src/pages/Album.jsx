import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musicsList: [],
    albumInfo: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.getMusicList();
  }

  getMusicList = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ isLoading: true });
    const musicsList = await getMusics(id);
    const albumInfo = musicsList
      .map(
        ({
          previewUrl,
          trackName,
          artworkUrl100,
          collectionName,
          artistName,
          trackId,
        }) => ({
          previewUrl, trackName, artworkUrl100, collectionName, artistName, trackId,
        }),
      )
      .filter(({ previewUrl }) => previewUrl);
    this.setState({ isLoading: false, musicsList, albumInfo });
  };

  render() {
    const { musicsList, isLoading, albumInfo } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading && (
          <Loading />
        )}
        {musicsList.length > 0 && (
          <div>
            <h2 data-testid="album-name">{musicsList[0].collectionName}</h2>
            <h3 data-testid="artist-name">{musicsList[0].artistName}</h3>
          </div>
        )}
        {(!isLoading) && (
          albumInfo.map(({ trackName, previewUrl, trackId }, index) => (
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
            />
          )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
