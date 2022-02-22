import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './context/auth'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import EmployerScreen from './screens/EmployerScreen'
import ApplicationScreen from './screens/ApplicationScreen'
import UserListScreen from './screens/UserListScreen'
import EmployerListScreen from './screens/EmployerListScreen'
import ApplicationListScreen from './screens/ApplicationListScreen'
import ApplicationDetailsScreen from './screens/ApplicationDetailsScreen'
import EmployerDetailsScreen from './screens/EmployerDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
              <Route exact path='/' element={<HomeScreen />} />
              <Route exact path='/login' element={<LoginScreen />} />
              <Route exact path='/logout' element={<HomeScreen />} />
              <Route exact path='/signin' element={<RegisterScreen />} />
              <Route exact path='/dashboard' element={<DashboardScreen />} />
              <Route exact path='/profile' element={<ProfileScreen />} />
              <Route exact path='/employers' element={<EmployerScreen />} />
              <Route exact path='/employers/profile/:id' element={<EmployerDetailsScreen />} />
              <Route exact path='/applications' element={<ApplicationScreen />} />
              <Route exact path='/admin/userlist' element={<UserListScreen />} />
              <Route exact path='/admin/employerlist' element={<EmployerListScreen />} />
              <Route exact path='/admin/applicationlist' element={<ApplicationListScreen />} />
              <Route exact path='/applications/:id' element={<ApplicationDetailsScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
