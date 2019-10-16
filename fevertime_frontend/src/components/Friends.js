import React, { Component } from 'react';
import './Friends.css'
import AddGroupPopup from "./component/PopupFilled";
class Friends extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddGroupPopup : false,
            friendlist : [
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},{firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
            ],
            groupName : '',

        }
    }
    clickAddGroup = () => () => {
        this.setState({
            showAddGroupPopup : true,

        })
    }
    clickAddGroupConfirm = () => () => {
        this.setState({
            showAddGroupPopup : false,
            groupName : '',

        })
    }
    clickClose = () => () => {
        this.setState({
            showAddGroupPopup : false,
            groupName : ''
        })
    }
    groupNameChange = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }

    render() {
        return (
            <div className='d-flex h-100'>
                <AddGroupPopup show={this.state.showAddGroupPopup}
                            modalTitle={'Add Group'}
                            content={'Group name'}
                            buttonConfirm={'Make Group'}
                            clickClose={this.clickClose()}
                            clickConfirm={this.clickAddGroupConfirm()}
                            changeContent={this.groupNameChange}
                />
                <div className='w-80 mt-5'>
                    <div className='d-flex'>
                        <div className='w-50 page-title pl-5'>Friends</div>
                        <div className='w-20'></div>
                        <div className='w-20'>
                            <button onClick={this.clickAddGroup()} className='w-80 button-blue'>Add Group</button>
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
                                <div className='badge-custom '>A</div>
                                GroupA
                                <div className='p-number'>4</div>
                            </div>
                            <div className='w-50'>Youngjae</div>
                        </div>
                        <div className='w-100 d-flex item-list'>
                            <div className='w-50 d-flex d-ho-center'>
                                <div className='badge-custom '>G</div>
                                Gildong
                                <div className='p-number'>2</div>
                            </div>
                            <div className='w-50'>Gildong</div>
                        </div>
                    </div>
                </div>
                <div className='w-20 fri-list p-relative'>
                    <div className='d-flex fri-list-button'>
                        <div className='w-50'>My Friends</div>
                        <div className='w-50'>Friending list</div>
                    </div>
                    <div className='pl-3 friend-scroll'>
                        {this.state.friendlist.map((value,index) => {
                            return (
                                <div className='d-flex mt-2' key={index}>
                                    <div className='badge-custom t-center'>{value.firstword}</div>
                                    {value.name}
                                </div>
                            );
                        })}
                    </div>
                    <div className='add-friend-button-wrapper'>
                        <button className='mt-3 w-100 button-blue'>Add friend</button>
                    </div>
                </div>


            </div>
        )
    }
}
export default Friends;