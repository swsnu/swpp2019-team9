import React, { Component } from 'react';
import './Friends.css'
import AddGroupPopup from "./component/PopupFilled";
class Friends extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddGroupPopup : false,
            showMyFriend : true,
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
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
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
            friendinglist : [
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
                {firstword : 'A', name : 'Andrew'},
                {firstword : 'G', name : 'Gildong'},
            ],
            groupList : [
                {firstword : 'A', name : 'GroupA', num: 4, TopFever : 'Youngjae'},
                {firstword : 'G', name : 'Gildong', num: 2, TopFever : 'Gildong'},
                {firstword : 'D', name : 'GroupD', num: 4, TopFever : 'Youngjae'},
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
    clickMyFriends = () => () => {
        this.setState({
            showMyFriend : true,

        })
    }
    clickFriendingList = () => () => {
        this.setState({
            showMyFriend : false,

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

                        <div>
                            {this.state.groupList.map((value,index) => {
                                return (
                                    <div key={index} className='w-100 d-flex item-list'>
                                        <div className='w-50 d-flex d-ho-center'>
                                            <div className='badge-custom '>{value.firstword}</div>
                                            {value.name}
                                            <div className='p-number'>{value.num}</div>
                                        </div>
                                        <div className='w-50'>{value.TopFever}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-20 fri-list p-relative'>
                    <div className='d-flex fri-list-button'>
                        <div className={(this.state.showMyFriend ? 'show-my-friend-tab' : 'hide-my-friend-tab')} onClick={this.clickMyFriends()}>My Friends</div>
                        <div className={(!this.state.showMyFriend ? 'show-my-friend-tab' : 'hide-my-friend-tab')} onClick={this.clickFriendingList()}>Friending list</div>
                    </div>
                    <div className='pl-3 friend-scroll'>
                        {this.state.showMyFriend ? (
                                <div>
                                    {this.state.friendlist.map((value,index) => {
                                        return (
                                            <div className='d-flex mt-2' key={index}>
                                                <div className='badge-custom t-center'>{value.firstword}</div>
                                                {value.name}
                                            </div>
                                        );
                                    })}
                                </div>
                        ):
                            (<div>
                                {this.state.friendinglist.map((value,index) => {
                                    return (
                                        <div className='d-flex mt-2' key={index}>
                                            <div className='badge-custom t-center'>{value.firstword}</div>
                                            {value.name}
                                        </div>
                                    );
                                })}
                            </div>)}

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