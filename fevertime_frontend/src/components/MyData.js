import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import ColumnChart from "./Chart/ColumnChart";

const daysinweek = ["MON","TUE","WED","THU","FRI","SAT","SUN"]


class MyData extends Component {
    constructor(props){
        super(props)
        this.state={
            selectTime : 0,

            chartData : [],
            chartTitle :'',

            total_time : 0,
            fever_time : 0,

            showModeD : false,
            showModeW : true,
            showModeM : false,
        }
    }

    componentDidMount(){
        this.getFeverData()
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
                    total_time: res.data.total_time,
                    fever_time: res.data.fever_time,
                    selectedDay : res.data.selectedDay,
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
                    chartData : [
                        {
                             type: "stackedColumn",
                             name: "FeverTime",
                             color: "red",
                             showInLegend: false,
                             yValueFormatString: "#,###.##h",
                             dataPoints: res.data.map((value,index)=>{
                                 return {label: value.days+"("+daysinweek[index]+")", y:value.fever_time/3600}
                                })
                            },{
                             type: "stackedColumn",
                             name: "NonFeverTime",
                             color: "gray",
                             showInLegend: false,
                             yValueFormatString: "#,###.##h",
                             dataPoints: res.data.map((value,index)=>{
                                return {label: value.days+"("+daysinweek[index]+")", y:(value.total_time-value.fever_time)/3600}
                               })
                            }],
                    chartTitle : res.data[0].weekstart+"~"+res.data[0].weekend
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
                    chartData : [
                        {
                             type: "stackedColumn",
                             name: "FeverTime",
                             color: "red",
                             showInLegend: false,
                             yValueFormatString: "#,###.##h",
                             dataPoints: res.data.map((value,index)=>{return {label:String(index+1), y: value.fever_time/3600 }}),
                          },
                         {
                             type: "stackedColumn",
                             name: "NonFeverTime",
                             color: "gray",
                             showInLegend: false,
                             yValueFormatString: "#,###.##h",
                             dataPoints: res.data.map((value,index)=>{return {label:String(index+1), y: (value.total_time-value.fever_time)/3600 }}),
                         }],
                    chartTitle : String(res.data[0].year)+"/"+String(res.data[0].month)
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
        return (
            <div className='form-container MyData'>
                <div className='w-30  page-title mt-5'>My Data</div>
                <div className='d-flex mt-5 w-100 button-data'>
                    <div className='w-33' onClick = {this.clickDaily} id ='daily-button'>Daily</div>
                    <div className='w-33' onClick = {this.clickWeekly} id ='daily-button'>Weekly</div>
                    <div className='w-33' onClick = {this.clickMonthly} id ='daily-button'>Monthly</div>
                </div>
                
                <div >
                    {(this.state.showModeD)?(''):(
                        <div>
                            <div className='mt-5'>
                                <ColumnChart data={this.state.chartData} title={this.state.chartTitle}></ColumnChart>
                            </div>
                            <div className='mt-5 d-flex'>    
                                <button className='w-30 button-blue' onClick = {this.clickLeft} id ='left-button'>Left</button>
                                <div className= 'w-40'></div>
                                <button className='w-30 button-blue' onClick = {this.clickRight} id ='right-button'>Right</button>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    } 
}

export default connect(null,null)(MyData);

