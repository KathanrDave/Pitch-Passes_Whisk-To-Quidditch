// email sending using the nodemailer


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
  auth: {
    user: 'your_email@example.com',
    pass: 'your_email_password',
  },
});

const mailOptions = {
  from: 'your_email@example.com',
  to: 'recipient@example.com',
  subject: 'Test Email from Nodemailer',
  text: 'This is a test email sent from Nodemailer.',
  html: '<h1>Hello!</h1><p>This is a test email sent from <b>Nodemailer</b>.</p>',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
