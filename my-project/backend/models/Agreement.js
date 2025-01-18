const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amountDue: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, default: 'active' },
  reminders: [
    {
      reminderDate: Date,
      isSent: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model('Agreement', AgreementSchema);
