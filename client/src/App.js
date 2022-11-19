import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import React from 'react';
import {Helmet} from 'react-helmet'
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import GoogleAuth from './components/GoogleAuth';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
      <div>
        {/* <Helmet>
          <style>{  'body { background: #001E3C; background-repeat : no-repeat; background-size : 100% }' }</style>
        </Helmet> */}
        {/* <SignIn></SignIn> */}

        <Router>
          <Routes>
            <Route path="/Register" element={<Register/>}></Route>
            <Route path="/" element = {<SignIn/>}></Route>
            <Route path="/dashboard" element = {<Dashboard/>}></Route>
            <Route path="/ForgotPassword" element = {<ForgotPassword/>}></Route>
            <Route path="/ChangePassword" element={<ChangePassword/>}></Route>
          </Routes>
        </Router>

        {/* <Router>
          
          <Route path='/Register' component = {Register} > </Route>
        </Router> */}
        


      </div>
  
  );
}

export default App;
