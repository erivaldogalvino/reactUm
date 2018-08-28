// SurveyForm mostra um form para um user adicionar inputs
import _ from 'lodash';
import React, { Component} from 'react';
import { reduxForm, Field } from 'redux-form';  // permite forms comun. com o redux store
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },  // com noValueError: '' poderia customizar error msg
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
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancela
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Próximo
                        <i className="material-icons right"></i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    /*
    if (!values.title) {    // verifique no SurveyField o meta passado
        errors.title = 'Voce deve fornecer um título';
    }
    if (!values.subject) {    // verifique no SurveyField o meta passado
        errors.subject = 'Voce deve fornecer um assunto';
    }
    if (!values.body) {    // verifique no SurveyField o meta passado
        errors.body = 'Voce deve fornecer um texto';
    } 
    */

    errors.emails = validateEmails(values.emails || ''); // || resolve crash -first boot up- pq validates são exec

    _.each(FIELDS, ({ name }) => {   // se o erro fosse customizar por field usaria noValueError
        // abaixo perceba que é diferente de values.name.  Name é o objeto on the fly
        if (!values[name]) {        // a propr values do objeto (name) on the fly - verificar esta sintaxe
            errors[name] = 'Voce deve prover um valor';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);

//<Field type="text" name="surveyTitle" component="input" />

// ideal para depurar
//<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
