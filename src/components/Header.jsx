import React from 'react';
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
          <span data-testid="header-user-name">{name}</span>
        </header>
      )
    );
  }
}

export default Header;
