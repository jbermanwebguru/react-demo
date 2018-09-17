import React from 'react';
import InputField from './InputField';
import agent from '../agent';
import { connect } from 'react-redux';
import { REGISTER } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (first_name, last_name, email, password, confirm_password) => {
    const payload = agent.Auth.register(first_name, last_name, email, password, confirm_password);
    dispatch({ type: REGISTER, payload })
  }
});

class Register extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.formValid = () => Object.values(this.state.errors).indexOf(true) === -1;

    this.submitForm = () => ev => {
      ev.preventDefault();
      this.setState({ submitClicked: true });
      if (this.formValid()) {
        this.props.onSubmit(
            this.state.first_name,
            this.state.last_name,
            this.state.email,
            this.state.password,
            this.state.confirm_password);
      }
    }

    this.state = {
      submitClicked: false,
      error: '',
      errors: {
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        confirm_password: true,
      },
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    };
  }

  handleChange(fieldId, value) {
    this.setState({ [fieldId]: value, errors: {...this.state.errors, [fieldId]: !value } });
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          <h1>Register</h1>

          <form onSubmit={this.submitForm()}>
            <InputField onChange={this.handleChange} cols="2" type="text"
              name="first_name" label="First Name" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="text"
              name="last_name" label="Last Name" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="1" type="email"
              name="email" label="Email" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="password"
              name="password" label="Password" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="password"
              name="confirm_password" label="Confirm Password" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <div className="center">
              <button className="button">Submit</button>
            </div>

          </form>
        </div>
      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
