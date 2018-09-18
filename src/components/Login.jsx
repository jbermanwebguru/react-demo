import React from 'react';
import InputField from './InputField';
import agent from '../agent';
import { connect } from 'react-redux';
import { LOGIN } from '../constants/actionTypes';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) => {
    const payload = agent.Auth.login(email, password);
    dispatch({ type: LOGIN, payload })
  }
});

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.formValid = () => Object.values(this.state.errors).indexOf(true) === -1;

    this.submitForm = () => ev => {
      ev.preventDefault();
      this.setState({ submitClicked: true });
      if (this.formValid()) {
        this.props.onSubmit(
            this.state.email,
            this.state.password,
        );
      }
    }

    this.state = {
      submitClicked: false,
      error: '',
      errors: {
        email: true,
        password: true,
      },
      email: '',
      password: '',
    };
  }

  handleChange(fieldId, value) {
    this.setState({ [fieldId]: value, errors: {...this.state.errors, [fieldId]: !value } });
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          <h1>Login</h1>

          <form autocomplete="off" onSubmit={this.submitForm()}>
            <InputField onChange={this.handleChange} cols="2" type="text"
              id="email" name="email" label="Email" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="password"
              id="password" name="password" label="Password" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <ListErrors errors={this.props.errors} />

            <div className="center">
              <button id="login" className="button">Log In</button>
            </div>

          </form>
        </div>
      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
