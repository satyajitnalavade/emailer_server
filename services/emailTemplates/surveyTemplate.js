const keys = require('../../config/secret')
module.exports = (survey) => {
    return `
        <html>
            <html>
                <body>
                    <div style="text-align:center;">
                        <h3>I'd like your input !</h3>
                        <p>Please answer the following questions: </p>
                        <p>${survey.body}</p>
                        <div>
                            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                        </div>
                        <div>
                            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">NO</a>
                        </div>
                    </div>
                </body>
            </html>
        </html>
    `;
};