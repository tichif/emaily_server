module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <h3>I'd like your input</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${
              process.env.NODE_ENV === 'production'
                ? process.env.REDIRECT_DOMAIN_PROD
                : process.env.REDIRECT_DOMAIN
            }/api/surveys/feedback">Yes</a>
          </div>
          <div>
            <a href="${
              process.env.NODE_ENV === 'production'
                ? process.env.REDIRECT_DOMAIN_PROD
                : process.env.REDIRECT_DOMAIN
            }/api/surveys/feedback">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
