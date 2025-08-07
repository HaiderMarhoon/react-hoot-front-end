import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

const SignUp = (props) => {

  const navigate = useNavigate()
  const initialState = {
    username: '',
    password: '',
    passwordConf:"",
  }

  const [formData, setFormData] = useState(initialState)
  const [error,setError] =useState(null)

  useEffect(()=>{
    if(props.user){
      navigate('/')
    }
  },[props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const result =props.handleSignUp(formData)
    if(result.success){
      navigate("/")
    }
    else{
      setError(result.message)
    }
  }

  let formIsInvalid = true

  if(formData.username && formData.password && formData.password === formData.passwordConf){
    formIsInvalid = false;

  }

  return (
    <main>
      <h1>Sign up Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} />
        <br />
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} />
        <br />
        <label>Password Conf:</label>
        <input type="password" name='passwordConf' onChange={handleChange} />
        <br />
        <button type="submit" disabled={formIsInvalid}>Sign up</button>
      </form>
    </main>
  )
}

export default SignUp