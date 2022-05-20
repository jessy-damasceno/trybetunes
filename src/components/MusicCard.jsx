import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    this.setState({ isChecked: checked, isLoading: true });
    if (checked) {
      await addSong(async () => getMusics(trackId));
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isChecked, isLoading } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      isLoading ? <Loading /> : (
        <div className="music_card">
          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite_music">
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite_music"
              onChange={ this.handleChange }
              checked={ isChecked }
            />
            Favorita
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
