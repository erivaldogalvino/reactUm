// SurveyNew mostra SurveyForm e SurveyFormReview
import React, { Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    /* constructor(props) {
        super(props);

        this.state = { showFormReview: false };
      }
    */
    // condensando o "constructor(props)" pelo 100% equivalente abaixo
 
    state = { ShowFormReview: false };


//onSurveySubmit={() => this.setState({ showFormReview: true })}

    renderContent() {
            console.log(this.state.ShowFormReview);
        if (this.state.ShowFormReview) {
        return <SurveyFormReview />;
        } 

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} 
            />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;
