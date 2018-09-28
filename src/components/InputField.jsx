import React from 'react';

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      hasValue: false,
      value: ''
    };
  }

  componentDidMount() {
    this.render();
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      hasValue: event.target.value !== ''
    });
    this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    const hasValue = () => {
      return this.state.hasValue;
    };
    const hasError = () => {
      return this.props.submitClicked && this.props.errors[this.props.name];
    };

    if (this.props.type === 'select') {
      const options = this.props.options.map(option => <option key={option.value} value={option.value}>{option.text}</option>);
      return (
        <div className={'col-' + this.props.cols}>
          <select id={this.props.id} name={this.props.name}
            className={'input-field' + (hasError() ? ' error' : '') + (hasValue() ? ' has-value' : '')}
            onChange={this.handleChange}>
            <option value=''></option>
            {options}
          </select>
          <label>{this.props.label}</label>
          <span className="focus-border"><i></i></span>
          <span className="error-label">Required</span>
        </div>
      );
    }

    return (
      <div className={'col-' + this.props.cols}>
        <input autoComplete="false" type={this.props.type} id={this.props.id} name={this.props.name}
          className={'input-field' + (hasError() ? ' error' : '') + (hasValue() ? ' has-value' : '')}
          onChange={this.handleChange}/>
        <label>{this.props.label}</label>
        <span className="focus-border"><i></i></span>
        <span className="error-label">Required</span>
      </div>
    );
  }

};

export default InputField;
