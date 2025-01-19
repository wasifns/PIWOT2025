const nodemailer = require('nodemailer');

// Set up the transporter (configured once for system emails)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // System email from environment variables
    pass: process.env.EMAIL_PASSWORD, // Email password from environment variables
  },
});

// Function to send reminder emails
function sendReminderEmail(companyName, dueDate, amountDue, userEmail) {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);

  // Calculate time difference in days
  const timeDifference = dueDateObj - currentDate;
  const daysUntilDue = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Prepare email content
  const emailMessage =
    daysUntilDue <= 7
      ? `Reminder: The agreement with ${companyName} is due in ${daysUntilDue} day(s).
          - Amount Due: ${amountDue}
          - Due Date: ${dueDate}`
      : `The agreement with ${companyName} is not due anytime soon.
          - Amount Due: ${amountDue}
          - Due Date: ${dueDate}`;

  const mailOptions = {
    from: process.env.EMAIL, // System email
    to: userEmail, // Dynamic email fetched from login
    subject: 'Agreement Due Date Reminder',
    text: emailMessage,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendReminderEmail,
};
