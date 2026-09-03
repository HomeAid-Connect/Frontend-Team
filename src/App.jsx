import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import OtpScreen from './Components/OtpScreen'
import LandingPage from './Components/LandingPage'
import Dashboard from './Components/Dashboard'
import {Routes, Route} from 'react-router'

function App() {

  return (
    <>
   

<Routes>
  <Route path='/' element={<LandingPage/>}/>
  <Route path='/login' element={<LoginPage/>}/>
  <Route path='/register/customer' element={<RegisterPage role={'customer'}/>}/>
  <Route path='/register/artisan' element={<RegisterPage role={'artisan'}/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/register/otp' element={<OtpScreen/>}/>
</Routes>

    </>
  )
}

export default App
