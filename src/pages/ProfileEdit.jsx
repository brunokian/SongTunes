import { connect } from 'react-redux';

import React from 'react';
import Header from '../components/Header';
import sendProfileData from '../redux/actions';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    descricao: '',
    image: '',
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(sendProfileData(this.state));
    history.push('profile');
  }

  render() {
    const { name, email, descricao, image } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>PROFILEEDIT CONTEUDO</p>
        <form>
          <label htmlFor="name">
            nome
            <input
              id="name"
              name="name"
              data-testid="edit-input-name"
              value={ name }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            email
            <input
              id="email"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descrição">
            descrição
            <textarea
              id="descrição"
              data-testid="edit-input-description"
              name="descricao"
              value={ descricao }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            URL image
            <input
              id="image"
              name="image"
              value={ image }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            label="Salvar"
            onClick={ this.handleClick }
            data-testid="edit-button-save"
          />
        </form>
      </div>
    );
  }
}

export default connect()(ProfileEdit);

// export default ProfileEdit;
