import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
            amount={500}        // here be accountable the currency you are working to
            token={token => console.log(token)}            // here it is the callback which will work the token retrived by stripe
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}

export default Payments;