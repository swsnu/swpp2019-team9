import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import WeeklyChart from "./Chart/WeeklyChart";
import MonthlyChart from "./Chart/MonthlyChart";
class MyData extends Component {
    constructor(props){
        super(props)
        this.state={
            selectTime : 0,
            total_time : [],
            fever_time : [],
            days : [],
            
            year : 0,
            month : 0,

            weekstart : '',
            weekend : '',

            showModeD : false,
            showModeW : true,
            showModeM : false,
        }
    }

    componentDidMount(){
        this.getFeverData_W()
    }

    getFeverData = () => {
        if(this.state.showModeD)this.getFeverData_D()
        else if(this.state.showModeW)this.getFeverData_W()
        else this.getFeverData_M()
    }
    getFeverData_D = () => {
        axios.post('/api/fever_data_D/',{
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then( res =>
            {
                this.setState({
                    total_time: res.data.map((value)=>{return value.total_time}),
                    fever_time: res.data.map((value)=>{return value.fever_time}),
                    days : res.data.map((value)=>{return value.days})
                })
            })
    }

    getFeverData_W = () => {
        axios.post('/api/fever_data_W/',{
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then( res =>
            {
                this.setState({
                    total_time: res.data.map((value)=>{return value.total_time}),
                    fever_time: res.data.map((value)=>{return value.fever_time}),
                    days : res.data.map((value)=>{return value.days}),
                    weekstart : res.data[0].weekstart,
                    weekend : res.data[0].weekend,
                })
            })
    }

    getFeverData_M = () => {
        axios.post('/api/fever_data_M/',{
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then( res =>
            {
                this.setState({
                    total_time: res.data.map((value)=>{return value.total_time}),
                    fever_time: res.data.map((value)=>{return value.fever_time}),
                    year : res.data[0].year,
                    month : res.data[0].month
                })
            })
    }

    clickDaily = () => {  
        this.setState({
            showModeD:true,
            showModeW:false,
            showModeM:false,
            selectTime : 0,
        },()=>{this.getFeverData()})
    }

    clickWeekly = () => {
        this.setState({
            showModeD:false,
            showModeW:true,
            showModeM:false,
            selectTime : 0,
        },()=>{this.getFeverData()})
    }
    clickMonthly = () => {
        this.setState({
            showModeD:false,
            showModeW:false,
            showModeM:true,
            selectTime : 0,
        },()=>{this.getFeverData()})
    }
        
    clickLeft = () => {  
        this.setState({
            selectTime : this.state.selectTime-1
        },()=>{this.getFeverData()})
    }

    clickRight = () => {  
        this.setState({
            selectTime : this.state.selectTime+1
        },()=>{this.getFeverData()})
    }

    render() {        
        console.log(this.state.days)

        return (
            <div className='form-container MyData'>
                <div className='w-30  page-title mt-5'>My Data</div>
                <div className='d-flex mt-5 w-100 button-data'>
                    <div className='w-33' onClick = {this.clickDaily} id ='daily-button'>Daily</div>
                    <div className='w-33' onClick = {this.clickWeekly} id ='daily-button'>Weekly</div>
                    <div className='w-33' onClick = {this.clickMonthly} id ='daily-button'>Monthly</div>
                </div>
                
                <div className='mt-5'>
                    {(this.state.showModeD)?('')
                    :(this.state.showModeW)?(
                    <WeeklyChart total_time={this.state.total_time} fever_time={this.state.fever_time} days={this.state.days} weekstart={this.state.weekstart} weekend={this.state.weekend}></WeeklyChart>)
                    :(<MonthlyChart total_time={this.state.total_time} fever_time={this.state.fever_time} year={this.state.year} month={this.state.month}></MonthlyChart>)}
                </div>
                            <button className='w-30 button-blue' onClick = {this.clickLeft} id ='left-button'>Left</button>
                            <button className='w-30 button-blue' onClick = {this.clickRight} id ='right-button'>Right</button>
            </div>
        )
    } 
}

export default connect(null,null)(MyData);

