import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ResearchAreas from './pages/ResearchAreas'
import Events from './pages/Events'
import Publications from './pages/Publications'
import News from './pages/News'
import AdvisoryBoard from './pages/AdvisoryBoard'
import Team from './pages/Team'
import Membership from './pages/Membership'
import Contact from './pages/Contact'
import Login from './pages/Login'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research-areas" element={<ResearchAreas />} />
          <Route path="/events" element={<Events />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/advisory-board" element={<AdvisoryBoard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App