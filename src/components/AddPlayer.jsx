import React from 'react';
import InputField from './InputField';
import agent from '../agent';
import { connect } from 'react-redux';
import { ADD_PLAYER } from '../constants/actionTypes';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (first_name, last_name, rating, handedness) => {
    const payload = agent.Players.create(first_name, last_name, rating, handedness);
    dispatch({ type: ADD_PLAYER, payload })
  }
});

class AddPlayer extends React.Component {
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
            this.state.rating,
            this.state.handedness
          );
      }
    }

    this.state = {
      submitClicked: false,
      error: '',
      errors: {
        first_name: true,
        last_name: true,
        rating: true,
        handedness: true
      },
      first_name: '',
      last_name: '',
      rating: '',
      handedness: ''
    };
  }

  handleChange(fieldId, value) {
    this.setState({ [fieldId]: value, errors: {...this.state.errors, [fieldId]: !value } });
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          <h1>Add A Player</h1>

          <form autocomplete="false" onSubmit={this.submitForm()}>
            <InputField onChange={this.handleChange} cols="2" type="text"
              id="firstName" name="first_name" label="First Name" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="text"
              id="lastName" name="last_name" label="Last Name" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="number"
              id="rating" name="rating" label="Rating" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <InputField onChange={this.handleChange} cols="2" type="handedness"
              id="handedness" name="handedness" label="Handedness" errors={this.state.errors}
              submitClicked={this.state.submitClicked}/>

            <ListErrors errors={this.props.errors} />

            <div className="center">
              <button id="create" className="button">Add Player</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
