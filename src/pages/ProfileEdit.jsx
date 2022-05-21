import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    user: {},
    isDisabled: false,
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    console.log(user);
    this.setState({ isLoading: false, user }, () => this
      .setState({ isDisabled: this.validateButton() }));
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
    this.setState({ isDisabled: this.validateButton() });
  }

  validateButton = () => {
    const min = 3;
    const { user } = this.state;
    const { name, email, image, description } = user;

    if (name?.length >= min
      || email?.includes('@')
      || description?.length > 0
      || image?.length > 0) {
      return true;
    }
    return false;
  }

  handleClick = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await updateUser(user);
    history.push('/profile');
  }

  render() {
    const { user, isLoading, isDisabled } = this.state;
    const { name, email, image, description } = user;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form className="form">
            <input
              type="text"
              name="name"
              id="input_name"
              data-testid="edit-input-name"
              placeholder="Nome de usuário"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="email"
              id="input_email"
              data-testid="edit-input-email"
              placeholder="Email do usuário"
              value={ email }
              onChange={ this.handleChange }
            />
            <textarea
              name="description"
              id="input_description"
              data-testid="edit-input-description"
              placeholder="Descrição do usuário"
              value={ description }
              onChange={ this.handleChange }
            />
            <input
              name="image"
              id="input_image"
              type="text"
              data-testid="edit-input-image"
              placeholder="Foto de usuário"
              value={ image }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              id="save_button"
              data-testid="edit-button-save"
              disabled={ !isDisabled }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
