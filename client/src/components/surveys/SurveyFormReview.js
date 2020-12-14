import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import FIELDS from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const renderContent =  _.map(FIELDS, ({ id, label, name}) => {
    return (
      <div key={id}>
        <label htmlFor={label}>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {renderContent}
      <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>Back</button> 
      <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}><i className="material-icons right">email</i> Send Survey</button>
    </div>
  );
};

function mapStateToProps(state){
  return {
    formValues : state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
