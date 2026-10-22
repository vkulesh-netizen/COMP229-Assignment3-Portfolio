import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Services from './pages/Services'
import Contact from './pages/Contact'
import './styles/App.css'
import {AuthProvider} from './Auth'
import Account from './pages/Account'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider><div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/signin" element={<Account />} />
          <Route path="/signup" element={<Account signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div></AuthProvider>
  )
}

export default App
