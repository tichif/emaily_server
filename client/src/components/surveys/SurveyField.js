import React, { Component } from 'react';

class SurveyField extends Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.label}</label>
        <input {...this.props.input} />
      </div>
    )
  }
}

export default SurveyField;
