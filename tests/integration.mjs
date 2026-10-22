import assert from 'node:assert/strict'
const root='../'
process.env.MONGODB_URI='mongodb://127.0.0.1:27017/Assignment3Verification'
process.env.JWT_SECRET='verification-secret-only'
const {default:mongoose}=await import(root+'node_modules/mongoose/index.js')
const {default:app}=await import(root+'server/express.js')
const {default:User}=await import(root+'server/models/user.model.js')
await mongoose.connect(process.env.MONGODB_URI)
const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r))
const base='http://127.0.0.1:'+server.address().port
async function req(url,method='GET',body,token){const r=await fetch(base+url,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined});return {status:r.status,data:await r.json()}}
try{
 const email='verify-'+Date.now()+'@example.com'
 const signup=await req('/api/users','POST',{name:'Reader',email,password:'TestPassword123',role:'admin'});assert.equal(signup.status,201);assert.equal(signup.data.role,'user')
 const user=await req('/auth/signin','POST',{email,password:'TestPassword123'});assert.equal(user.status,200)
 assert.equal((await req('/api/projects','POST',{},user.data.token)).status,403)
 assert.equal((await req('/api/projects','DELETE')).status,401)
 assert.equal((await req('/api/users','GET',undefined,user.data.token)).status,403)
 const admin=await User.create({name:'Administrator',email:'admin-'+email,password:'TestPassword123',role:'admin'})
 const login=await req('/auth/signin','POST',{email:admin.email,password:'TestPassword123'});const token=login.data.token
 assert.equal((await req('/auth/me','GET',undefined,token)).data.role,'admin')
 for(const kind of ['projects','qualifications','contacts']){
  const body=kind==='contacts'?{firstname:'Test',lastname:'Record',email,contactNumber:'555-1234',message:'Saved message'}:{title:'Test',firstname:'Test',lastname:'Record',email,completion:'2026-10-22',description:'Test description'}
  const created=await req('/api/'+kind,'POST',body,token);assert.equal(created.status,201)
  const id=created.data._id;assert.ok(id)
  assert.equal((await req('/api/'+kind+'/'+id,'GET',undefined,token)).status,200)
  assert.equal((await req('/api/'+kind+'/'+id,'PUT',{...body,...(kind==='contacts'?{message:'Updated'}:{title:'Updated'})},token)).status,200)
  assert.equal((await req('/api/'+kind+'/'+id,'DELETE',undefined,user.data.token)).status,403)
  assert.equal((await req('/api/'+kind+'/'+id,'DELETE',undefined,token)).status,200)
 }
 const contact=await req('/api/contact-messages','POST',{firstname:'Guest',lastname:'Visitor',email,message:'Full message',contactNumber:'555'});assert.equal(contact.status,201);assert.equal(contact.data.message,'Full message');assert.equal(contact.data.contactNumber,'555')
 assert.equal((await req('/auth/signin','POST',{email,password:'wrong'})).status,401)
 assert.equal((await req('/auth/signout')).status,200)
 console.log('PASS: registration cannot grant admin; JWT login; admin CRUD for three collections; reader denied mutations; anonymous denied protected access; contact message persisted; invalid password rejected; signout endpoint.')
}finally{await mongoose.connection.dropDatabase();await mongoose.disconnect();server.close()}

