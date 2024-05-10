import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <div className='w-full h-auto box-border'>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
