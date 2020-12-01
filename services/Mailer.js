const sendGrid = require('sendgrid');

const helpers = sendGrid.mail;

class Mailer extends helpers.Mail {}

module.exports = Mailer;
