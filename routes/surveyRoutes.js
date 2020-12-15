const { URL } = require('url');

const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey');

module.exports = (app) => {
  app.post('/api/surveys', [requireLogin, requireCredits], async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try {
      // Send email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();

      await survey.save();

      // Charge the user for the survey
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/surveys/feedback', (req, res) => {
    res.send('Thanks for give us your feedback');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({ url, email }) => {
      const pathName = new URL(url).pathname;

      const parser = new Path('/api/surveys/:surveyId/:choice');
      const match = parser.test(pathName);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });
    console.log(events);
    res.send({});
  });
};
