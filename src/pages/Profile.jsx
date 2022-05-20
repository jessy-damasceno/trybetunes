import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    user: {},
  }

  componentDidMount() {
    this.getUserDetails();
  }

  async getUserDetails() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, user });
  }

  render() {
    const { user, isLoading } = this.state;
    const { description, email, image, name } = user;
    console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div className="userDetails">
            <section>
              <img data-testid="profile-image" src={ image } alt="Imagem de perfil" />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </section>
            <section className="profile_name">
              <h3>Nome</h3>
              <p>{name}</p>
            </section>
            <section className="profile_email">
              <h3>E-mail</h3>
              <p>{email}</p>
            </section>
            <section className="profile_description">
              <h3>Descrição</h3>
              <p>{description}</p>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
