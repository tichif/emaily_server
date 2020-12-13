import React, { Component } from 'react';
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);
