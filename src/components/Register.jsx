import React from 'react';

import InputField from './InputField';

class Register extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit(event) {
    this.setState({ submitClicked: true });
    if (Object.values(this.state.errors).indexOf(true) === -1) {
      fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
          confirm_password: this.state.confirm_password,
        })
      }).then(function(json) {
        this.props.history.push('/roster');
      }).catch(function(ex) {
        this.setState({error: 'Could not register: ' + ex});
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          <h1>Register</h1>
          <form>
            <InputField onChange={this.handleChange} cols="2" type="text" name="first_name" label="First Name" errors={this.state.errors} submitClicked={this.state.submitClicked}/>
            <InputField onChange={this.handleChange} cols="2" type="text" name="last_name" label="Last Name" errors={this.state.errors} submitClicked={this.state.submitClicked}/>
            <InputField onChange={this.handleChange} cols="1" type="email" name="email" label="Email" errors={this.state.errors} submitClicked={this.state.submitClicked}/>
            <InputField onChange={this.handleChange} cols="2" type="password" name="password" label="Password" errors={this.state.errors} submitClicked={this.state.submitClicked}/>
            <InputField onChange={this.handleChange} cols="2" type="password" name="confirm_password" label="Confirm Password" errors={this.state.errors} submitClicked={this.state.submitClicked}/>
            <div className="center">
              <button className="button" onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

};

export default Register;
