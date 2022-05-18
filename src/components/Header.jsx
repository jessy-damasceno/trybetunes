import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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

    return (!isLoading ? <h3>Carregando...</h3>
      : (
        <header data-testid="header-component">
          <nav>
            <ul>
              <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
              <li>
                <Link data-testid="link-to-favorites" to="/favorites">
                  Músicas Favoritas
                </Link>
              </li>
              <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
            </ul>
          </nav>
          <span data-testid="header-user-name">{name}</span>
        </header>
      )
    );
  }
}

export default Header;
