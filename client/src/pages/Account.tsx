import {FormEvent,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useAuth} from '../Auth'
import {api} from '../api'
export default function Account({signup=false}:{signup?:boolean}){
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false)
 const {signin}=useAuth(),navigate=useNavigate()
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError('');try{if(signup)await api('/api/users',{method:'POST',body:JSON.stringify({name,email,password})});await signin(email,password);navigate('/')}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 return <section className="page"><div className="container narrow"><div className="section-heading"><p className="eyebrow">Account</p><h1>{signup?'Create Account':'Sign In'}</h1></div><form className="card contact-form" onSubmit={submit}>{error&&<p className="error-banner" role="alert">{error}</p>}{signup&&<label>Name<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>}<label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label><label>Password<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete={signup?'new-password':'current-password'}/></label><button className="btn btn-primary" disabled={busy}>{busy?'Please wait…':signup?'Create Account':'Sign In'}</button><p>{signup?'Already registered?':'New here?'} <Link to={signup?'/signin':'/signup'}>{signup?'Sign in':'Create an account'}</Link></p></form></div></section>
}
