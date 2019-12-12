import React, { Component } from 'react';
import './Header.css'
import '../App.css'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from "../store/actions/index";
import PropTypes from 'prop-types';
import FeverModePopup from "./component/PopupMessage";
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: false,
            logout : null,
            myAccount : null,
            signup : null,
            fevermode: false,
        }
    }
    clickLogout=()=>{
        if(window.location.pathname==='/fevermode'){
            this.setState({fevermode:true})
        }
        else{
            this.props.onLogoutUser()
        }
    }
    handleClick=(e)=>{
        if(window.location.pathname==='/fevermode'){
            this.setState({fevermode:true})
            e.preventDefault();
        }
    }
    clickMessageClose = ()=>{
        this.setState({fevermode:false})
    }
    render() {
        return (
            <div className='header-container Header'>
                <FeverModePopup show={this.state.fevermode}
                                modalTitle={"Button Disabled"}
                                content={"You are in Fever Mode!"}
                                buttonConfirm={'OK'}
                                isSuccess={true}
                                clickClose={this.clickMessageClose}
                                clickConfirm={this.clickMessageClose}
                />
                <div className='logo'><Link className='c-orange' to='/' onClick={this.handleClick}>Fever Time</Link></div>
                <div className='d-flex header-right'>
                    <div><Link to='/feverstart' onClick={this.handleClick} id='link'>Go Fever</Link></div>
                    {this.props.storedMyAccount.uid!==null &&this.props.storedMyAccount.username!==null && this.props.storedMyAccount.nickname!==null ? (
                        <div className='header-right-child'>
                            <div><Link to={'/mydata/' + this.props.storedMyAccount.uid} onClick={this.handleClick}>My Data</Link></div>
                            <div><Link to='/friends' onClick={this.handleClick}>Friends</Link></div>
                            <div><Link to='/myaccount' onClick={this.handleClick}>My Account</Link></div>
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