import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Hello World!</h1>
      </div>
    </Router>
  );
}

export default App;
