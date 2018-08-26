const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>Gostariamos da sua opinião!</h3>
                    <p>Por favor responda seguinte questão:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">Sim</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">Não</a>
                    </div>
                </div>
            </body>
        </htmml>
    `;
};