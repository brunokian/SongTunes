import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favotires';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    login: '',
    loginValidation: true,
    hasLogged: false,
    load: false,
  }

  validation = () => {
    const { login } = this.state;
    const minimumCaracteres = 3;
    if (login.length < minimumCaracteres) {
      this.setState({ loginValidation: true });
    } else {
      this.setState({ loginValidation: false });
    }
  }

  logging = async () => {
    const { login } = this.state;
    this.setState(
      { load: true },
      async () => {
        await createUser({ name: login });
        this.setState({
          hasLogged: true,
          load: false });
      },
    );
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validation);
  }

  render() {
    const { login, loginValidation, hasLogged, load } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          {hasLogged ? <Redirect to="/search" /> : <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              login={ login }
              loginValidation={ loginValidation }
              handleChange={ this.handleChange }
              hasLogged={ hasLogged }
              logging={ this.logging }
              load={ load }
            />) }
          />}
          {/* <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              login={ login }
              loginValidation={ loginValidation }
              handleChange={ this.handleChange }
              hasLogged={ hasLogged }
              logging={ this.logging }
              load={ load }
            />) }
          /> */}
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
