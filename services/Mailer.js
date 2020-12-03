const sendGrid = require('sendgrid');

const helpers = sendGrid.mail;

class Mailer extends helpers.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendGrid(
      process.env.NODE_ENV === 'production'
        ? process.env.SENDGRID_KEY_PROD
        : process.env.SENDGRID_KEY
    );
    this.from_email = new helpers.Email('charlby5@gmail.com');
    this.subject = subject;
    this.body = new helpers.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //addContent is provided by Sendgrid

    // Enable click tracking in the email
    this.addClickTracking();

    this.addRecipients();
  }

  formatAddresses(addresses) {
    return addresses.map(({ email }) => {
      return new helpers.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helpers.TrackingSettings();
    const clickTracking = new helpers.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helpers.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  // Send Mail
  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON(),
      });
      console.log('request', request);
      const response = await this.sgApi.API(request);
      console.log('res', response);
      return response;
    } catch (error) {
      console.log(error.response.body);
    }
  }
}

module.exports = Mailer;
