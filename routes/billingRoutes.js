const keys = require('../config/keys');
const stripe =  require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
           // console.log(req.body);
           // verificar se ta logado, i.e, se o Passaport 
           // achou o cockie
           // mas o melhor é criar um middleware que controle isto
           // veja ./middlewares
           //if (!req.user) {
           //     return res.status(401).send({error: 'Voce deve se logar'});
           //}

           // ver doc node api docs - stripe api
           const charge = await stripe.charges.create({
               amount: 500,
               currency: 'brl',
               description: 'R$5,00 por 5 emails',
               source: req.body.id
           });
           //console.log(charge);
           //Se teve sucesso no bloco acima, respondo o request 
           //com o user-model
        req.user.credits += 5;    // passado automaticamente pelo Passport. Ver passaport.initialize()
        const user = await req.user.save();
        
        res.send(user);  // pra verificar exec app veja na console aba 
                         // network  XHR (req response) o json que esta
                        //  respondido para a Api
    });
};