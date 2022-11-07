import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

// import { createUser } from './services/userAPI';

class Login extends React.Component {
  render() {
    const { login, handleChange, logging, loginValidation, load } = this.props;
    if (load) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <p>COMPONENTE LOGIN</p>
        <input
          id="login"
          name="login"
          type="text"
          value={ login }
          onChange={ handleChange }
          data-testid="login-name-input"
        />
        <button
          id="loginButton"
          name="loginButton"
          type="submit"
          disabled={ loginValidation }
          onClick={ () => logging({ name: login }) }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.string.isRequired,
  loginValidation: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  logging: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
};

export default Login;
