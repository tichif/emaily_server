import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formFields'

class SurveyForm extends Component {
  renderFields(){
    return(
      _.map(FIELDS, ({ id, label, name}) => <Field key={id} type='text' name={name} component={SurveyField} label={label} />)
    )
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
         {this.renderFields()}
         <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button className="teal btn-flat right white-text" type='submit'>Next <i className="material-icons right">done</i> </button>
        </form>
      </div>
    );
  }
}

function validate (values) {
  const errors = {};
  
  // Validate emails
  errors.emails = validateEmails(values.emails || '')

  // Check if there values in the input
  _.each(FIELDS, ({ name }) => {
    if(!values[name]){
      errors[name] = "You must provide a value !"
    }
  })


  return errors;
}

export default reduxForm({
  validate ,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
