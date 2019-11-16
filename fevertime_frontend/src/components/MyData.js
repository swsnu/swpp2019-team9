import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import ColumnChart from "./Chart/ColumnChart";
import PieChart from "./Chart/PieChart";

const daysinweek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

class MyData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectTime: 0,

            chartData: [],
            chartTitle: '',
            selectedDay: '',

            total_total_time: '',
            total_fever_time: '',
            avg_total_time: '',
            avg_fever_time: '',

            category_time: [],

            showModeD: false,
            showModeW: true,
            showModeM: false,
        }
    }

    componentDidMount() {
        this.getFeverData()
    }

    getFeverData = () => {
        if (this.state.showModeD) this.getFeverData_D()
        else if (this.state.showModeW) this.getFeverData_W()
        else this.getFeverData_M()
    }
    getFeverData_D = () => {
        axios.post('/api/fever_data_D/', {
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then(res => {
            this.setState({
                total_total_time: res.data.total_total_time,
                total_fever_time: res.data.total_fever_time,
                category_time: res.data.category_time,
                selectedDay: res.data.selectedDay,
            })
        })
    }

    setState_WM = (res, week) => {
        if (week) {
            var dataPointsF = res.data.map((value, index) => {
                return { label: value.days + "(" + daysinweek[index] + ")", y: value.fever_time / 3600 }
            })
            var dataPointsN = res.data.map((value, index) => {
                return { label: value.days + "(" + daysinweek[index] + ")", y: (value.total_time - value.fever_time) / 3600 }
            })
        }
        else {
            var dataPointsF = res.data.map((value, index) => {
                return { label: String(index + 1), y: value.fever_time / 3600 }
            })
            var dataPointsN = res.data.map((value, index) => {
                return { label: String(index + 1), y: (value.total_time - value.fever_time) / 3600 }
            })
        }

        this.setState({
            total_total_time: res.data[0].total_total_time,
            total_fever_time: res.data[0].total_fever_time,
            avg_total_time: res.data[0].avg_total_time,
            avg_fever_time: res.data[0].avg_fever_time,
            category_time: res.data[0].category_time,
            chartData: [
                {
                    type: "stackedColumn",
                    name: "FeverTime",
                    color: "red",
                    showInLegend: false,
                    yValueFormatString: "#,##0.##h",
                    dataPoints: dataPointsF
                }, {
                    type: "stackedColumn",
                    name: "NonFeverTime",
                    color: "gray",
                    showInLegend: false,
                    yValueFormatString: "#,##0.##h",
                    dataPoints: dataPointsN
                }],
            chartTitle: res.data[0].chartTitle
        })
    }

    getFeverData_W = () => {
        axios.post('/api/fever_data_W/', {
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then(res => {
            this.setState_WM(res, true)
        })
    }

    getFeverData_M = () => {
        axios.post('/api/fever_data_M/', {
            user_id: this.props.match.params.user_id,
            selectTime: this.state.selectTime
        }).then(res => {
            this.setState_WM(res, false)
        })
    }

    clickDaily = () => {
        this.setState({
            showModeD: true,
            showModeW: false,
            showModeM: false,
            selectTime: 0,
        }, () => { this.getFeverData() })
    }

    clickWeekly = () => {
        this.setState({
            showModeD: false,
            showModeW: true,
            showModeM: false,
            selectTime: 0,
        }, () => { this.getFeverData() })
    }
    clickMonthly = () => {
        this.setState({
            showModeD: false,
            showModeW: false,
            showModeM: true,
            selectTime: 0,
        }, () => { this.getFeverData() })
    }

    clickLeft = () => {
        this.setState({
            selectTime: this.state.selectTime - 1
        }, () => { this.getFeverData() })
    }

    clickRight = () => {
        this.setState({
            selectTime: this.state.selectTime + 1
        }, () => { this.getFeverData() })
    }

    render() {
        return (
            <div className='form-container MyData'>
                <div className='w-30  page-title mt-5'>My Data</div>
                <div className='d-flex mt-5 w-100 button-data'>
                    <div className='w-33' onClick={this.clickDaily} id='daily-button'>Daily</div>
                    <div className='w-33' onClick={this.clickWeekly} id='daily-button'>Weekly</div>
                    <div className='w-33' onClick={this.clickMonthly} id='daily-button'>Monthly</div>
                </div>
                <div className='mt-5 d-flex'>
                    <button className='w-30 button-blue' onClick={this.clickLeft} id='left-button'>Left</button>
                    <div className='w-40'></div>
                    <button className='w-30 button-blue' onClick={this.clickRight} id='right-button'>Right</button>
                </div>
                {(this.state.showModeD) ? (
                    <div className='t-center mt-5 f-large'>{this.state.selectedDay}</div>
                ) : (
                        <div className='mt-5'>
                            <ColumnChart data={this.state.chartData} title={this.state.chartTitle} />
                        </div>
                    )}
                <div className='mt-5 d-flex'>
                    <div className='w-30 f-large mt-5'>Total Time</div>
                    <div className='w-20 f-large mt-5'>{this.state.total_total_time}</div>
                    <div className='w-30 f-large mt-5'>Fever Time</div>
                    <div className='w-20 f-large mt-5'>{this.state.total_fever_time}</div>
                </div>

                {(this.state.showModeD) ? ('') : (
                    <div className='d-flex'>
                        <div className='w-30 f-large mt-5'> Avg Total Time </div>
                        <div className='w-20 f-large mt-5'>{this.state.avg_total_time}</div>
                        <div className='w-30 f-large mt-5'>Avg Fever Time</div>
                        <div className='w-20 f-large mt-5'>{this.state.avg_fever_time}</div>
                    </div>)}

                <div className='mt-5'>
                    <PieChart category_time={this.state.category_time} />
                </div>
                <div className='mt-5'> </div>





            </div>
        )
    }
}

MyData.propTypes={
    match: PropTypes.shape({
        params: PropTypes.shape({
        user_id: PropTypes.number
        })
    }),
}

export default connect(null, null)(MyData);

