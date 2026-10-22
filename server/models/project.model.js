import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    role: {type:String,trim:true},
    technologies: {type:String,trim:true},
    imageKey: {type:String,trim:true},
    title: {
      type: String,
      trim: true,
      required: [true, 'Project title is required'],
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

export default mongoose.model('Project', projectSchema)
