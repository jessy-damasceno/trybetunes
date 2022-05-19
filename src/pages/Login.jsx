import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import LOGO_POSITIVA from '../assets/LOGO_POSITIVA.png';

class Login extends React.Component {
  state = {
    nameInput: '',
    isDisabled: false,
    isLoading: false,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ nameInput: value });

    this.setState(({ nameInput }) => {
      const minChars = 3;
      return { isDisabled: nameInput.length >= minChars };
    });
  }

  handleClick = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameInput });
    history.push('/search');
  }

  render() {
    const { isDisabled, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div className="page-login" data-testid="page-login">
            <form className="login_form">
              <img src={ LOGO_POSITIVA } alt="TrybeTunes Logo" />
              <input
                data-testid="login-name-input"
                type="text"
                name="login-name-input"
                placeholder="Nome"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ !isDisabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
