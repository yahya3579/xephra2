const nodemailer = require('nodemailer');

// For production, use real SMTP credentials
// let transporter;

// if (process.env.NODE_ENV === 'production') {
//   transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD
//     },
//     tls: {
//       rejectUnauthorized: false // Prevents TLS certificate error
//     }
//   });
// } else {
//   // For development, you can use services like Mailtrap or Ethereal
//   transporter = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io', // Replace with your preferred dev email service
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_PASSWORD
//     }
//   });
// }

// module.exports = { transporter };



const Sib = require('sib-api-v3-sdk');

// Initialize Brevo client
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Create transactional email instance
const transactionalEmailApi = new Sib.TransactionalEmailsApi();

module.exports = { transactionalEmailApi };
