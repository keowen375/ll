import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignInPage from './components/LogInPage'
import LandingPage from './components/landingpage'
import NavBar from './components/navbar'
import ViewDoctors from './components/Doctors'
import RegisterPage from './components/RegisterPage'
import ForgetPasswordPage from './components/ForgetPasswordPage'
import CreateAppointment from './components/createappointment'
import UpdateAppointment from './components/updateappointment'
import ViewAppointment from './components/viewappointment'
import { AuthProvider } from './components/auth'
import RequireAuth from './components/RequireAuth'

export default function App() {
    return (
    <div>
        <AuthProvider>
          <NavBar/>
                <Routes>
                    <Route path="/" element={ <LandingPage/> } />
                    <Route path="/login" element={ <SignInPage/> } />
                    <Route path="/register" element={ <RegisterPage />} />
                    <Route path='/doctors' element={<RequireAuth><ViewDoctors/></RequireAuth>} />
                    <Route path="/forget-password" element={<ForgetPasswordPage />} />
                    <Route path='/create-appointment' element={<RequireAuth><CreateAppointment/></RequireAuth>} />
                    <Route path='/update-appointment/:id' element={<RequireAuth><UpdateAppointment/></RequireAuth>} />
                    <Route path='/appointments' element={<RequireAuth><ViewAppointment/></RequireAuth>} />
                </Routes>  
        </AuthProvider>
    </div>
    )
}