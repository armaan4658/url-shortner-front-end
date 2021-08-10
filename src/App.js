import './App.css';
import {Switch,Route} from "react-router-dom";
import {LoginComponent} from './components/loginComponent.js';
import {HomeComponent} from './components/homeComponent.js';
import {SignUp} from './components/signUpComponent.js';
import {ForgotPassword} from './components/forgotPasswordComponent.js';
import {OtpVerification} from './components/otpVerificationComponent.js';
import {PasswordReset} from './components/passwordResetComponent.js';
import React from 'react';
function App() {
  return (
    <div className="App">
          <Switch>
            <Route exact path='/'>
                <LoginComponent />
            </Route>
            <Route path='/signup'>
                <SignUp />
            </Route>
            <Route path='/forgotpassword'>
                <ForgotPassword />
            </Route>
            <Route path='/home'>
                <HomeComponent />
            </Route>
            <Route path='/verifyaccount/:_id'>
              <OtpVerification />
            </Route>
            <Route path='/passwordreset/:_id'>
              <PasswordReset />
            </Route>
          </Switch>
    </div>
  );
}

export default App;
