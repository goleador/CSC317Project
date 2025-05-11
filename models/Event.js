const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  scheduledDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Event', EventSchema);