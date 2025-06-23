import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    maxlength: [255, 'Email is too long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  ip: {
    type: String,
    index: true,
  },
  userAgent: {
    type: String,
  },
  referrer: {
    type: String,
  },
});

// Create compound index for efficient queries
WaitlistSchema.index({ email: 1, createdAt: -1 });
WaitlistSchema.index({ createdAt: -1 });

// Add virtual for formatted date
WaitlistSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toISOString();
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
