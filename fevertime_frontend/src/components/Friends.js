import React, { Component } from 'react';
import './Friends.css'
class Friends extends Component {
    render() {
        return (
            <div className='d-flex h-100'>
                <div className='w-80 mt-5'>
                    <div className='d-flex'>
                        <div className='w-50 page-title pl-5'>Friends</div>
                        <div className='w-20'>
                            <button className='w-80 button-blue'>Add Group</button>
                        </div>
                        <div className='w-20'>
                            <button className='w-80 button-blue'>Add friend</button>
                        </div>
                    </div>
                    <div className='d-flex mt-5 pl-5'>
                        <div className='w-100 d-flex title-list'>
                            <div className='w-50'>Name</div>
                            <div className='w-50'>Top Fever</div>
                        </div>
                    </div>
                    <div className='pl-5'>
                        <div className='w-100 d-flex item-list'>
                            <div className='w-50 d-flex d-ho-center'>
                                <div className='badge '>A</div>
                                GroupA
                                <div className='p-number'>4</div>
                            </div>
                            <div className='w-50'>Youngjae</div>
                        </div>
                        <div className='w-100 d-flex item-list'>
                            <div className='w-50 d-flex d-ho-center'>
                                <div className='badge '>G</div>
                                Gildong
                                <div className='p-number'>2</div>
                            </div>
                            <div className='w-50'>Gildong</div>
                        </div>
                    </div>
                </div>
                <div className='w-20 fri-list'>
                    <div className='d-flex fri-list-button'>
                        <div className='w-50'>My Friends</div>
                        <div className='w-50'>Friending list</div>
                    </div>
                    <div className='pl-3'>
                        <div className='d-flex mt-2'>
                            <div className='badge t-center'>G</div>
                            Gildong
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='badge t-center'>A</div>
                            Andrew
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default Friends;