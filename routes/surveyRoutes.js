const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Agradecido por votar!');
    });


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;   // destructing

        const survey = new Survey({
            title,
            subject,
            body,                                           // .split ret array e .map cria
                                                           //  um array de objects cd um -> {email: aaa@gmail}
                                                          //   o () necessario por usar arrow func
                                                         //    -- retorna um array de objects --
            recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
            _user: req.user.id,
            dateSent: Date.now()
        });
        // Aqui é ideal para enviar um email.
        const mailer = new Mailer(survey, surveyTemplate(survey));
        // eu que coloquei pq subject ta vindo vazio
        mailer.subject = 'Assunto de teste';  // eu que coloquei pq ta vindo vazio
        // console.log(mailer.subject);

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        }   catch (err) {
            res.status(422).send(err);
        }
    });
};

//       -> Pra testar na console
// const survey = { title:'titulo teste', subject: 'assunto teste', recipients: 'billperroni@gmail.com', body: 'o corpo do email' };
// axios.post('/api/surveys', survey);
//       -> e colocar no index.js do frontend (cliente)
// import axios from 'axios';
// window.axios = axios;