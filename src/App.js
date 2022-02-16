import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import EmployerScreen from './screens/EmployerScreen'
import ApplicationScreen from './screens/ApplicationScreen'
import UserListScreen from './screens/UserListScreen'
import EmployerListScreen from './screens/EmployerListScreen'
import ApplicationListScreen from './screens/ApplicationListScreen'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route exact path='/profile' element={<ProfileScreen />} />
            <Route exact path='/employers' element={<EmployerScreen />} />
            <Route exact path='/applications' element={<ApplicationScreen />} />
            <Route exact path='/admin/userlist' element={<UserListScreen />} />
            <Route exact path='/admin/employerlist' element={<EmployerListScreen />} />
            <Route exact path='/admin/applicationlist' element={<ApplicationListScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
