import React, { Component } from 'react';
import './Header.css'
import '../App.css'
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <div className='header-container'>
                <div className='logo'><Link className='c-orange' to='/'>Fever Time</Link></div>
                <div className='d-flex header-right'>
                    <div><Link to='/feverstart'>Go Fever</Link></div>
                    <div><Link to='/mydata'>My Data</Link></div>
                    <div><Link to='/friends'>Friends</Link></div>
                    <div><Link to='/myaccount'>My Account</Link></div>
                    <div><Link to='/login'>Login</Link></div>
                    <div><Link to='/signup'>Signup</Link></div>

                </div>
            </div>
        )
    }
}
export default Header;