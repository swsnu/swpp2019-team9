import React, { Component } from 'react';
import './Header.css'
import '../App.css'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from "../store/actions/index";
class Header extends Component {
    clickLogout=()=>{
        this.props.onLogoutUser()
    }
    render() {
    let login=null;
    let logout=null;
    let myAccount=null;
    let signup=null;
    if(this.props.storedMyAccount.uid!==null &&this.props.storedMyAccount.username!==null && this.props.storedMyAccount.nickname!==null){
        myAccount =<div><Link to='/myaccount'>My Account</Link></div>
        logout = <button onClick={this.clickLogout}>Logout</button> //need to change how this look TT
    }
    else{
        login=<div><Link to='/login'>Login</Link></div>
        signup=<div><Link to='/signup'>Signup</Link></div>
    }

        return (
            <div className='header-container'>
                <div className='logo'><Link className='c-orange' to='/'>Fever Time</Link></div>
                <div className='d-flex header-right'>
                    <div><Link to='/feverstart'>Go Fever</Link></div>
                    <div><Link to='/mydata'>My Data</Link></div>
                    <div><Link to='/friends'>Friends</Link></div>
                    {myAccount}
                    {logout}
                    {login}
                    {signup}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        storedMyAccount:state.login,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: ()=>
            dispatch(actionCreators.logoutUser()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);