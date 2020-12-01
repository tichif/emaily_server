const sendGrid = require('sendgrid');

const helpers = sendGrid.mail;

class Mailer extends helpers.Mail {
  constructor({ subject, recipients }, content) {
    super();
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
}

module.exports = Mailer;
