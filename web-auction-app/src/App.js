import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from "./Components/login";
import Home from "./Components/home";
import ItemDetails from "./Components/itemdetails";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (<Router>
    <div className="App">
      <h3 className="mt-3 mb-3">Antique Auction </h3>
      {/* <div className="auth-wrapper">
        <div className="auth-inner"> */}
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/itemdetails" component={ItemDetails} />
          </Switch>
        {/* </div>
      </div> */}
    </div></Router>
  );
}

export default App;