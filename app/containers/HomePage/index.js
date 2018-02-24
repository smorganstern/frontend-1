/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';

import H2 from 'components/H2';
import H1 from 'components/H1';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import ToggleOption from 'components/ToggleOption';

import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   * NOT NEEDED will change
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>TutorFind</title>
          <meta name="Tutorfind" content="A web app to connect students and teachers for improved learning" />
        </Helmet>
        <div>
		<Wrapper>
		  {/*About Us*/}
          <CenteredSection>
            <H1>
              <FormattedMessage {...messages.aboutUsHeader} />
            </H1>
            <p>
              <FormattedMessage {...messages.aboutMessage} />
            </p>
          </CenteredSection>
		  {/*end About Us*/}
		
		  {/*Sign up*/}
          <CenteredSection>
			<H1>
			  <FormattedMessage {...messages.signUpHeader} />
			</H1>
			
			{/*Form*/}
			<Form onSubmit={this.props.onSubmitForm}>
			  <div>
              <label htmlFor="username">
                <FormattedMessage {...messages.usernameMessage} />
                <Input
                  id="username"
                  type="text"
                  placeholder="Student1"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
			  </div>
			  
			  <div>
			  <label htmlFor="email">
                <FormattedMessage {...messages.emailMessage} />
                <Input
                  id="email"
                  type="text"
                  placeholder="student1@student.ndnu.edu"
                  value={this.props.email}
                  onChange={this.props.onChangeEmail}
                />
              </label>
			  </div>
			  
			  <div>
			  <label htmlFor="password">
                <FormattedMessage {...messages.passwordMessage} />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />
              </label>
			  </div>
			  
			  <div>
			  <label htmlFor="confirmPassword">
                <FormattedMessage {...messages.confirmPasswordMessage} />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />
              </label>
			  </div>
			  
			  <div>
			    <p> I am a </p>
				<Toggle>
					<ToggleOption value="student" intl="" />
									
				</Toggle>
			  </div>
			  
			  <div>
				<Button> Sign Up </Button>
			  </div>
			  
			</Form>
			{/*end Form*/}
			
		  </CenteredSection>  
		  {/*end Sign up */}
		</Wrapper>	
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  /*password: PropTypes.string,*/
  onChangeUsername: PropTypes.func,
  /*onChangePassword: PropTypes.func,*/
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
	/*onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),*/
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      /*dispatch(loadRepos()); Submit form code here*/
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  /*password: makeSelectPassword(),*/
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
