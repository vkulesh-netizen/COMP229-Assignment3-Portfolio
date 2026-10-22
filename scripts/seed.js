import mongoose from 'mongoose'
import fs from 'node:fs'
import config from '../config/config.js'
import User from '../server/models/user.model.js'
import Project from '../server/models/project.model.js'
import Qualification from '../server/models/qualification.model.js'
const data=JSON.parse(fs.readFileSync(new URL('./portfolio-data.json',import.meta.url)))
try {
 if(config.env==='production' && (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length<12 || process.env.ADMIN_PASSWORD==='Password123!')) throw new Error('Set ADMIN_PASSWORD to a unique password of at least 12 characters before production seeding.')
 await mongoose.connect(config.mongoUri)
 for(const [Model,rows] of [[Project,data.projects],[Qualification,data.qualifications]]){
  for(const row of rows) if(!await Model.exists({title:row.title}))await Model.create(row)
 }
 const email=process.env.ADMIN_EMAIL||'admin@portfolio.local'
 if(!await User.exists({email})) await User.create({name:'Portfolio Administrator',email,password:process.env.ADMIN_PASSWORD||'Password123!',role:'admin'})
 console.log('Portfolio seeded without deleting existing records. Administrator: '+email)
}catch(e){console.error(e.message);process.exitCode=1}finally{await mongoose.disconnect()}

