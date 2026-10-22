import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    contactNumber: { type: String, trim: true, maxlength: 50 },
    message: { type: String, trim: true, maxlength: 5000 },
    firstname: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
  },
  { versionKey: false },
)

export default mongoose.model('Contact', contactSchema)
