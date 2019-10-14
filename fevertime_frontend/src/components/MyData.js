import React, { Component } from 'react';
import StackedColumnChart from "./Chart/StackedColumnChart";
class MyData extends Component {
    render() {
        return (
            <div className='form-container'>
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
export default MyData;