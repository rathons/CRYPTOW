import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from './component/routing/PrivateRoute'; //Private Route
import Header from './component/header/header';
import PrivatePage from './pages/privatepage/PrivatePage';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import ForgotPassPage from './pages/forgotpasspage/ForgotPassPage';
import ResetPassPage from './pages/resetpasspage/ResetPassPage';
import './app.css';

const App =() => {
    return(
        <div className="bg-colour">
        <Header/>
        <Router>                                     
                <Switch>                                                       
                        <PrivateRoute exact path="/" component={PrivatePage}/>
                        <Route exact path="/signin" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/forgotpass" component={ForgotPassPage}/>
                        <Route exact path="/resetpass/:resetToken" component={ResetPassPage}/>                                                
                </Switch>  
        </Router>        
        </div> 
        
    )
}

export default App;