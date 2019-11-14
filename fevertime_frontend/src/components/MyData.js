import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import StackedColumnChart from "./Chart/StackedColumnChart";
class MyData extends Component {
    constructor(props){
        super(props)
        this.state={
            article: '',
            users: '',
            comments: '',
            check: false,
            check2: false,
            check3: false,
        }
    }

    componentDidMount(){
        axios.get('/api/fever_history/',{
            user_id: this.props.match.params.user_id
        }).then( res =>
            {
                console(res)
                // this.setState({
                //     article: res.data,
                //     check: true,
                // })        
            })

    }

    render() {        
        return (
            <div className='form-container MyData'>
                <div className='w-30  page-title mt-5'>My Data</div>
                <div className='d-flex mt-5 w-100 button-data'>
                    <div className='w-33'>Daily</div>
                    <div className='w-33'>Weekly</div>
                    <div className='w-33'>Monthly</div>
                </div>
                <div className='mt-5'>
                    <StackedColumnChart></StackedColumnChart>
                </div>
            </div>
        )
    } 
}

export default connect(null,null)(MyData);

