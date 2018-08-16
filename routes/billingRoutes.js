const keys = require('../config/keys');
const stripe =  require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
           // console.log(req.body);

           // ver doc node api docs - stripe api
           const charge = await stripe.charges.create({
               amount: 500,
               currency: 'brl',
               description: 'R$5,00 por 5 emails',
               source: req.body.id
           });
           console.log(charge);
    });
};