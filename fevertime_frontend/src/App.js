import React from 'react';
import { Route} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header'
import Main from './components/Main'
import './App.css';
import MyAccount from "./components/MyAccount";
import FeverStart from "./components/FeverStart";
import FeverReady from "./components/FeverReady";
import FeverMode from "./components/FeverMode";
import FeverEnd from "./components/FeverEnd";
import MyData from "./components/MyData";
import Friends from "./components/Friends";


function App(props) {
    return (
        <div className="App">
            <ConnectedRouter history={props.history}>
                <Header></Header>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/myaccount" component={MyAccount}/>
                <Route path="/feverstart" component={FeverStart}/>
                <Route path="/feverready" component={FeverReady}/>
                <Route path="/fevermode" component={FeverMode}/>
                <Route path="/feverend" component={FeverEnd}/>
                <Route path="/mydata" component={MyData}/>
                <Route path="/friends" component={Friends}/>
            </ConnectedRouter>
        </div>
    );
}

export default App;
