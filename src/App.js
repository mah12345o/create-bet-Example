import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Header from './Header';
import Page1 from './Page1';
import DetailsPage from './DetailsPage';

const App = () => {
  return (
    <Router>
        <Header /> 
        <Routes>
            <Route path="/" element={<Page1/>} />
            <Route path="/details" element={<DetailsPage />} />
        </Routes>
    </Router>
  )
}

export default App