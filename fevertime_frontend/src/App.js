import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom'
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
import {connect} from 'react-redux'
import * as actionCreators from "./store/actions";
import * as feverActionCreators from './store/actions/fever';
import PropTypes from 'prop-types'
import Group from "./components/Group";
import NotEndFeverHistoryModal from "./components/component/PopUpModal";

class App extends React.Component{
    componentDidMount(){
        this.props.onGetUser()
        this.props.getFeverException()
    }
    clickClose = () => () => {
        this.props.putFeverException('close')
    }
    clickConfirm = () => () => {
        this.props.putFeverException('confirm')
    }
    render(){
        return (
            <div className="App">
                <NotEndFeverHistoryModal show={this.props.num_fevers !== 0}
                                   modalTitle={"Find not finished Fever"}
                                   content={"There is unfinished Fever. Do you want to return to the last fever?"}
                                   buttonConfirm={"Go Last Fever"}
                                   buttonClose={"Force end all"}
                                   clickClose={this.clickClose()}
                                   clickConfirm={this.clickConfirm()}
                />
                <ConnectedRouter history={this.props.history}>
                    <Header></Header>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/myaccount" component={MyAccount}/>
                        <Route exact path="/feverstart" component={FeverStart}/>
                        <Route exact path="/feverready" component={FeverReady}/>
                        <Route exact path="/fevermode" component={FeverMode}/>
                        <Route exact path="/feverend" component={FeverEnd}/>
                        <Route exact path="/mydata/:id" component={MyData}/>
                        <Route exact path="/friends" component={Friends}/>
                        <Route exact path="/group/:id" component={Group}/>
                        <Redirect from="*" to='/' />
                    </Switch>
                </ConnectedRouter>
            </div>
        );
    }
}
App.propTypes={
    history:PropTypes.object,
    onGetUser:PropTypes.func,
    getFeverException:PropTypes.func,
    last_hid:PropTypes.number,
    num_fevers:PropTypes.number,
    putFeverException:PropTypes.func
}
const mapStateToProps = state => {
    return {
        last_hid:state.feverStart.last_hid,
        num_fevers:state.feverStart.num_fevers
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: ()=>
            dispatch(actionCreators.getUserInfo()),
        getFeverException: ()=>
            dispatch(feverActionCreators.getFeverException()),
        putFeverException: (clickmode)=>
            dispatch(feverActionCreators.putFeverException(clickmode)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
