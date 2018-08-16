import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
                name="Emaily"
                description="R$5,00 por 5 emails de créditos"
                panelLabel="Valor:"
                //image="https://assets.cengage.com/gale/icons/piac-thumb.png"
                amount={500}        // here be accountable the currency you are working to
                currency="BRL"
                //console.log(token)}  // here it is the callback which will work the token retrived by stripe
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                Adquira créditos
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
