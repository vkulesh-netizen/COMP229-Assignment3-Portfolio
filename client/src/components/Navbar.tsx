import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import {useAuth} from '../Auth'
import {useState} from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Me' },
]

function Navbar() {
 const {user,signout}=useAuth()
 const [error,setError]=useState('')
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink to="/" className="brand">
          <Logo />
          <span className="brand-name">Vitaliy Kulesh</span>
        </NavLink>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
          {user?.role==='admin'&&<NavLink className="nav-link" to="/admin">Manage</NavLink>}
          {user?<><span className="nav-link">{user.name}</span><button className="nav-link" onClick={()=>{setError('');signout().catch(e=>setError(e.message))}}>Sign Out</button></>:<NavLink className="nav-link" to="/signin">Sign In</NavLink>}
          {error&&<span role="alert">{error}</span>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
