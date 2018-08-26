// SurveyForm mostra um form para um user adicionar inputs
import _ from 'lodash';
import React, { Component} from 'react';
import { reduxForm, Field } from 'redux-form';  // permite forms comun. com o redux store
import SurveyField from './SurveyField';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Survey Line',  name: 'subject' },
    { label: 'Email Body',   name: 'body'},
    { label: 'Recipients List', name: 'emails' }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button style={{height:25, width:50}} type="submit"></button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);

//<Field type="text" name="surveyTitle" component="input" />
