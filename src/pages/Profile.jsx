import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

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
  console.log(this.props);
  const { loginInformation } = this.props;
  const { userData } = this.state;
  return (
    <div data-testid="page-profile">
      <Header />
      <p>PROFILE CONTEUDO</p>
      <p>{ loginInformation.name }</p>
      <p>{ loginInformation.email }</p>
      <p>{ loginInformation.descricao }</p>
      <img
        src={ loginInformation.image }
        alt={ loginInformation.name }
        data-testid="profile-image"
      />
      <Link to="/profile/edit">Editar perfil</Link>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  loginInformation: state.loginInformation,
});

export default connect(mapStateToProps)(Profile);
