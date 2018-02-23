import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import logo from './tutorfindlogo.png';
import messages from './messages';
import Wrapper from './Wrapper';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
	  <Wrapper>
        <A href="https://ndnu.edu">
          <Img src={logo} alt="Tutorfind - Logo" length="100px" width="100px"/>
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavBar>
	  </Wrapper> 
      </div>
    );
  }
}

export default Header;
