import './App.css'
import NavBar from './components/NavBar/NavBar.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import HootList from './components/HootList/HootList.jsx'
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm.jsx'
import { Route, Routes, useNavigate } from 'react-router'
import * as authService from './services/authService.js'
import * as hootService from './services/hootService.js'
import { useEffect, useState } from 'react'

const App = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [hoots, setHoots] = useState([])

  useEffect(()=>{
    const fetchAllHoots = async() =>{
      const hootsData = await hootService.index()
      setHoots(hootsData)
    }
    if(user) fetchAllHoots()
  },[user])

  const handleSignUp = async (formData) => {
    try{
      const res = await authService.signUp(formData)
      setUser(res)
      return {success: true}
    }
    catch(err){
      return{success:false , message: err}
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }
  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData)
    setHoots([newHoot, ...hoots])
    navigate('/hoots');
  };


  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path="/hoots" element={<HootList hoots={hoots} />} />
          <Route path="/hoots/:hootId" element={<HootDetails />} />
          <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user}/>} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user}/>} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>
  )
}

export default App