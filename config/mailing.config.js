const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tarotproject2@gmail.com',
    pass: 'popino6*_*',
  },
});

module.exports = transporter;
