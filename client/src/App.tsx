import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import {lazy,Suspense} from 'react'
const About=lazy(()=>import('./pages/About'))
const Projects=lazy(()=>import('./pages/Projects'))
const Education=lazy(()=>import('./pages/Education'))
const Services=lazy(()=>import('./pages/Services'))
const Contact=lazy(()=>import('./pages/Contact'))
import './styles/App.css'
import {AuthProvider} from './Auth'
const Account=lazy(()=>import('./pages/Account'))
const Admin=lazy(()=>import('./pages/Admin'))

function App() {
  return (
    <AuthProvider><div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<p className="container" role="status">Loading page…</p>}><Routes>
          <Route path="/signin" element={<Account />} />
          <Route path="/signup" element={<Account signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes></Suspense>
      </main>
      <Footer />
    </div></AuthProvider>
  )
}

export default App
