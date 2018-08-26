const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// o sendGrid é muito complicado pra formatar como se ve abaixo
// uma variante é verificar outros serviços como o MailChimp
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        
        this.sgApi = sendgrid(keys.sendGridKey);
        //this.sgApi = sendgrid('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');
                            // helper e Content sao utils da library
        this.from_email = new helper.Email('no-replay@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);  // adiciona o body ja formatado acima no Mailer
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {    // o ()s a mais é pq há uma op de destruction implicita
                                                 // e  arrow function exige o ()
            return new helper.Email(email);
            // resulta que recipients tem agora um array de emails formatados
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        try {
            const request = this.sgApi.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: this.toJSON()
            });
            const response = await this.sgApi.API(request);
            return response;
        }   catch (err) {
            console.log(err.response.body.errors);
        }
    }
}

// new Mailer()

module.exports = Mailer;