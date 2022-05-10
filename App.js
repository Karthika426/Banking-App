
import './App.css';
import React,{useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AccountSummary from './Components/account_summary';
import FundTransfer from './Components/fund_transfer';
import Login from './Components/login';
import Main from './Components/main';
import ContextProvider from './context/ContextProvider'

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  
  return (
   
    <Router>
      <Switch>
     
         <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/main' component={Main}/>
        {/* <Route exact path='/account_summary' component={()=><AccountSummary authorized={isAuthenticated} />}/>
        <Route exact path='/fund_transfer' component={()=><FundTransfer authorized={isAuthenticated}/>}/> */}
        
      </Switch>
    </Router>
  );
}

export default App;
