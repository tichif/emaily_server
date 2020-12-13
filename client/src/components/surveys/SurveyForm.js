import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash'

import SurveyField from './SurveyField'

const FIELDS = [
  {
    id : 1,
    label : 'Survey Title',
    name : 'title'
  },
  {
    id : 2,
    label : 'Subject Line',
    name : 'subject'
  },
  {
    id : 3,
    label : 'Email Body',
    name : 'body'
  },
  {
    id : 4,
    label : 'Recipients List',
    name : 'emails'
  },
]

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
          onSubmit={this.props.handleSubmit((values) => console.log(values))}
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

  if(!values.title){
    errors.title = "You must provide a title !"
  }
  return errors;
}

export default reduxForm({
  validate ,
  form: 'surveyForm',
})(SurveyForm);
