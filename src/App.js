import React from 'react';
import logo from './logo.svg';
import { Route, BrowserRouter,Switch } from 'react-router-dom'
import './App.css';
import Login from "./Dashboard/Login"
import Dashboardlayout from './Dashboard/Dashboardlayout'
import CallDetails from './Dashboard/CallDetails';
function App() {
  return (
    <BrowserRouter>
            <div>
                <switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/Dashboardlayout" component={Dashboardlayout}/>
                    <Route exact path="/Dashboardlayout/CallDetails" component={CallDetails}/>
                </switch>
            </div>
    </BrowserRouter>
  );
}

export default App;
