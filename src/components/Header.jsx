import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import LOGO_POSITIVA from '../assets/LOGO_POSITIVA.png';

class Header extends React.Component {
  state = {
    user: {},
    isLoading: false,
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      isLoading: true,
    });
  }

  render() {
    const { user: { name }, isLoading } = this.state;

    return (!isLoading ? <Loading />
      : (
        <header data-testid="header-component">
          <Link to="/">
            <img src={ LOGO_POSITIVA } alt="TrybeTunes Logo" />
          </Link>
          <nav>
            <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
            <Link data-testid="link-to-favorites" to="/favorites">
              Favoritas
            </Link>
            <Link data-testid="link-to-profile" to="/profile">Meu Perfil</Link>
            <span>|</span>
            <span data-testid="header-user-name">{name}</span>
          </nav>
        </header>
      )
    );
  }
}

export default Header;
