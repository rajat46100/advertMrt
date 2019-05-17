const {
  twilio: { accountSid, authToken },
  otpTemplate
} = require('config');
const parseTemplate = require('string-template');
const twilioClient = require('twilio')(accountSid, authToken);

exports.createMessage = ({ from, body, to }) => {
  return twilioClient.messages.create({
    body,
    from,
    to
  });
};

exports.createWhatsApp = ({ from, body, to }) => {
  return twilioClient.messages.create({
    body,
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`
  });
};

exports.sendOTP = async ({ from, otp, to }) => {
  return twilioClient.messages.create({
    body: parseTemplate(otpTemplate, { otp }),
    from,
    to
  });
};
