const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
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
        mailer.send();
    });
};