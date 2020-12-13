import React, { Component } from 'react';

class SurveyField extends Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.label}</label>
        <input {...this.props.input} />
        {
          this.props.meta.touched && this.props.meta.error
        }
      </div>
    )
  }
}

export default SurveyField;
