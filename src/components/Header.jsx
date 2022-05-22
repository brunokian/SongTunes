import React from 'react';

import Loading from '../Loading';

import { getUser } from '../services/userAPI';

class Header extends React.Component {
state = {
  userName: '',
  load: false,
}

componentDidMount() {
  this.getNameUser();
}

getNameUser = async () => {
  this.setState(
    { load: true },
    async () => {
      const result = await getUser();
      this.setState({
        load: false, userName: result.name });
    },

  );
}

render() {
  const { userName, load } = this.state;

  return (
    <header data-testid="header-component">
      <p data-testid="header-user-name">
        {' '}
        { load ? <Loading /> : userName }
        {' '}
      </p>
      <p>HEADER</p>
    </header>
  );
}
}

export default Header;
