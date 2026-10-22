import mongoose from 'mongoose'

const qualificationSchema = new mongoose.Schema(
  {
    school: {type:String,trim:true},
    period: {type:String,trim:true},
    title: {
      type: String,
      trim: true,
      required: [true, 'Qualification title is required'],
    },
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
    completion: {
      type: Date,
      required: [true, 'Completion date is required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
    },
  },
  { versionKey: false },
)

export default mongoose.model('Qualification', qualificationSchema)
