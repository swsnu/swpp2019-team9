import React, { Component } from 'react';
import './Friends.css'
import AddGroupPopup from "./component/PopupFilled";
import FriendsBar from '../components/component/FriendsBar'
class Group extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddGroupPopup : false,
            groupMemberList : [
                {rank : 1, firstword : 'Y', name : 'Youngjae', fever_time : '11:10:01'},
                {rank : 2, firstword : 'G', name : 'Gildong', fever_time : '09:10:01'},
                {rank : 3, firstword : 'Y', name : 'Youngjae', fever_time : '05:10:01'},
            ],
            commentsList : [
                {content : "I'm best fever", firstword : 'Y', name : 'Youngjae', reg_date : '2019-01-21 11:00'},
                {content : "I was so sick..", firstword : 'G', name : 'Gildong', reg_date : '2019-02-01 11:00'},
                {content : "Let's eat some dinner...", firstword : 'Y', name : 'Youngjae', reg_date : '2019-10-21 23:08'},
            ],
            groupName : 'Group A',
            myInfo : {firstword : 'Y', name : 'Youngjae', id:2},

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
            <div className='d-flex h-100 Friends'>
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
                        <div className='w-50 page-title pl-5'>{this.state.groupName} Leaderboard</div>
                        <div className='w-10'></div>
                        <div className='w-20'>
                            <button onClick={this.clickAddGroup()} className='w-80 button-blue'>Invite friends</button>
                        </div>
                        <div className='w-20'>
                            <button onClick={this.clickAddGroup()} className='w-80 button-red'>Exit group</button>
                        </div>
                    </div>
                    <div className='d-flex mt-5 pl-5'>
                        <div className='w-100 d-flex title-list'>
                            <div className='w-20'>Rank</div>
                            <div className='w-30'>Name</div>
                            <div className='w-50'>Fever Time</div>
                        </div>
                    </div>
                    <div className='pl-5 mb-5'>
                        <div>
                            {this.state.groupMemberList.map((value,index) => {
                                return (
                                    <div key={index} className='w-100 d-flex group-item-list'>
                                        <div className='w-20'>{value.rank}</div>
                                        <div className='w-30 d-flex d-ho-center'>
                                            <div className='badge-custom '>{value.firstword}</div>
                                            {value.name}
                                        </div>
                                        <div className='w-50'>{value.fever_time}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='pl-5 pr-5 mt-10'>
                        <div className='f-large'>Comments</div>
                        <div className='w-100 d-flex comments-list'></div>
                        <div>
                            {this.state.commentsList.map((value,index) => {
                                return (
                                    <div key={index} className='w-100 d-flex group-item-list'>
                                        <div className='w-30 d-flex d-ho-center'>
                                            <div className='badge-custom '>{value.firstword}</div>
                                            {value.name}
                                        </div>
                                        <div className='w-20'>{value.content}</div>
                                        <div className='w-50'>{value.reg_date}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='pl-5 pr-5'>
                        <div  className='w-100 d-flex group-comment-my'>
                            <div className='w-10'></div>
                            <div className='w-60'>
                                <input placeholder=' Comments something...' className='w-80 group-comment-input'/>
                            </div>
                            <button className='w-20 button-blue'>Comment</button>
                        </div>
                    </div>
                </div>
                <FriendsBar history={this.props.history}/>
            </div>
        )
    }
}
export default Group;