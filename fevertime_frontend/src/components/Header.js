import React, { Component } from 'react';
import './Header.css'
import '../App.css'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from "../store/actions/index";
import PropTypes from 'prop-types';
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: false,
            logout : null,
            myAccount : null,
            signup : null,

        }
    }
    clickLogout=()=>{
        this.props.onLogoutUser()
    }
    render() {
        return (
            <div className='header-container Header'>
                <div className='logo'><Link className='c-orange' to='/'>Fever Time</Link></div>
                <div className='d-flex header-right'>
                    <div><Link to='/feverstart'>Go Fever</Link></div>
                    {this.props.storedMyAccount.uid!==null &&this.props.storedMyAccount.username!==null && this.props.storedMyAccount.nickname!==null ? (
                        <div className='header-right-child'>
                            <div><Link to={'/mydata/' + this.props.storedMyAccount.uid}>My Data</Link></div>
                            <div><Link to='/friends'>Friends</Link></div>
                            <div><Link to='/myaccount'>My Account</Link></div>
                            <div onClick={this.clickLogout} id='logout-button'>Logout</div>
                        </div>
                    ): (
                        <div className='header-right-child'>
                            <div><Link to='/login'>Login</Link></div>
                            <div><Link to='/signup'>Signup</Link></div>
                        </div>

                    )}
                </div>
            </div>
        )
    }
}
Header.propTypes={
    storedMyAccount:PropTypes.object,
    onLogoutUser:PropTypes.func
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