import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { trackId, getFavoriteSongsList, musica } = this.props;
    this.setState({
      isLoading: true,
    });
    if (checked) {
      await addSong(musica);
      await getFavoriteSongsList();
    } else {
      await removeSong({ trackId });
      if (getFavoriteSongsList) {
        await getFavoriteSongsList();
      }
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    const { trackName, previewUrl, trackId, isFavorite } = this.props;
    return (
      <div className="music_card">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {isLoading && <Loading />}
        <label htmlFor="Favorita">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="Favorita"
            id="Favorita"
            onChange={ this.handleChange }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  getFavoriteSongsList: PropTypes.func.isRequired,
  musica: PropTypes.objectOf.isRequired,
};

export default MusicCard;
