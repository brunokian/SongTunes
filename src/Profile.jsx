import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { getUser } from './services/userAPI';

class Profile extends React.Component {
  state = {
    userData: {},
  }

  componentDidMount = async () => {
    this.userProfile();
  }

userProfile = async () => {
  const result = await getUser();
  this.setState({ userData: result });
}

render() {
  const { userData } = this.state;
  return (
    <div data-testid="page-profile">
      <Header />
      <p>PROFILE CONTEUDO</p>
      <p>{ userData.name }</p>
      <p>{ userData.email }</p>
      <p>{ userData.description }</p>
      <img src={ userData.image } alt={ userData.name } data-testid="profile-image" />
      <Link to="/profile/edit">Editar perfil</Link>
    </div>
  );
}
}

export default Profile;
