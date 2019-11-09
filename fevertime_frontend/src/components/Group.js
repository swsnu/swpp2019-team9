import React, { Component } from 'react';
import './Friends.css'
import AddMemberPopup from "./component/PopupFilled";
import ModalPopup from "./component/PopUpModal";
import FriendsBar from '../components/component/FriendsBar'
import axios from 'axios'
import { withRouter } from 'react-router';
import {connect} from 'react-redux'
import CommentSection from "./component/CommentSection"
class Group extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showMemberPopup : false,
            showExitPopup : false,
            group_id : 0,
            groupMemberList : [
                {rank : 1, firstword : 'Y', name : 'Youngjae', fever_time : '11:10:01'},
                {rank : 2, firstword : 'G', name : 'Gildong', fever_time : '09:10:01'},
                {rank : 3, firstword : 'Y', name : 'Youngjae', fever_time : '05:10:01'},
            ],
            FriendName : '',
            MyInfo : this.props.Mynickname
        }
    }
    componentDidMount(){
        this.setState({group_id : parseInt(window.location.href.split("/")[4],10)})
        this.getLeaderboard()
    }

    getLeaderboard=()=>{
        let group_id=parseInt(window.location.href.split("/")[4],10)
        axios.get("/api/group/group_comment/"+group_id+"/")
        .then(res => {
            this.setState({groupMemberList : res.data})
        })
    }

    clickInviteFriend = () => () => {
        this.setState({
            showMemberPopup : true,

        })
    }
    sendInviteFriend = () => () => {
        this.setState({
            showMemberPopup : false,
            FriendName : '',
        })
    }

    FriendNameChange = (e) =>{
        this.setState({
            FriendName : e.target.value
        })
    }

    clickExitGroup = () => () => {
        this.setState({
            showExitPopup : true,

        })
    }

    clickExitConfirm = () => () => {
        this.setState({
            showExitPopup : false,
        })
    }

    clickClose = () => () => {
        this.setState({
            showMemberPopup : false,
            showExitPopup : false,
            FriendName : '',
        })
    }

    render() {
        return (
            <div className='d-flex h-100 Friends'>
                <AddMemberPopup show={this.state.showMemberPopup}
                               modalTitle={'Add Member'}
                               content={'Friend Name'}
                               buttonConfirm={'Confirm'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.sendInviteFriend()}
                               changeContent={this.FriendNameChange}
                />
                
                <ModalPopup show={this.state.showExitPopup}
                               modalTitle={'Exit Group'}
                               content={'Really want to leave the group?'}
                               buttonConfirm={'Confirm'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.clickExitConfirm()}
                />

                <div className='w-80 mt-5'>
                    <div className='d-flex'>
                        <div className='w-50 page-title pl-5'>{this.state.groupName} Leaderboard</div>
                        <div className='w-10'></div>
                        <div className='w-20'>
                            <button onClick={this.clickInviteFriend()} className='w-80 button-blue'>Invite friends</button>
                        </div>
                        <div className='w-20'>
                            <button onClick={this.clickExitGroup()} className='w-80 button-red'>Exit group</button>
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
                    <CommentSection/>
                </div>
                <FriendsBar />
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        Mynickname : state.login.nickname
    }
}

export default connect(mapStateToProps,null)(withRouter(Group));