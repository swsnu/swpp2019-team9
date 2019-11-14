import React, { Component } from 'react';
import './Friends.css'
import AddFriendMessagePopup from "./component/PopupMessage";
import ModalPopup from "./component/PopUpModal";
import FriendsBar from './component/FriendsBar'
import { withRouter } from 'react-router';
import {connect} from 'react-redux'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import CommentSection from "./component/CommentSection"
class Group extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showMemberPopup : false,
            showExitPopup : false,
            showInviteMessagePopup : false,
            AddFriendMessageTitle : "",
            AddFriendMessageContent : "",
            addFriendSuccess : false,
            loadFriendSuccess : false,
            group_id : 0,
            groupMemberList : [],
            friendlist : [],
            FriendNames : [],
        }
    }
    componentDidMount(){
        let group_id=parseInt(window.location.href.split("/")[4],10)
        this.setState({group_id : group_id})
        this.getLeaderboard(group_id)
    }

    getLeaderboard=(group_id)=>{
        axios.get("/api/group/group_members/"+group_id+"/")
        .then(res => {
            this.setState({groupMemberList : res.data})
        })
    }

    clickInviteFriend = () => () => {
        axios.get('/api/group/group_add/'+this.state.group_id+"/")
            .then(res=>{
                let thing = res.data.map((value)=>{
                        return {'firstword' : value.nickname[0], 'name': value.nickname}})
                this.setState({friendlist: thing, loadFriendSuccess : true})
            })

        this.setState({
            showMemberPopup : true,
            FriendNames : [],
        })
    }
    sendInviteFriend = () => () => {
        if(this.state.FriendNames.length === 0 ){
            this.setState({
                showMemberPopup : false,
                showInviteMessagePopup : true,
                addFriendSuccess : false,
                AddFriendMessageTitle : 'No Friend Selected',
                AddFriendMessageContent : 'Select Friend',
                FriendNames : [],
            })
        }
        else{
            axios.post('/api/group/group_members/'+this.state.group_id+"/",
                {'nickname':this.state.FriendNames})
                .then(()=>{
                    this.setState({
                    showMemberPopup : false,
                    showInviteMessagePopup : true,
                    addFriendSuccess : true,
                    AddFriendMessageTitle : 'Friend request sended',
                    AddFriendMessageContent : 'Successfully Invited',
                    FriendNames : [],
                    })
                })
                .catch(error=>{
                    if(error.response.status===404 || error.response.status===400)
                        this.setState({
                            showMemberPopup : false,
                            showInviteMessagePopup : true,
                            addFriendSuccess : false,
                            AddFriendMessageTitle : 'Friend Invitation failed',
                            AddFriendMessageContent : 'Invalid nickname',
                            FriendNames : [],
                        })

            })
        }
    }

    clickExitGroup = () => () => {
        this.setState({
            showExitPopup : true,
        })
    }

    clickExitConfirm = () => () => {
        axios.delete('/api/group/group_members/'+this.state.group_id+"/")
        .then(this.props.history.push("/friends"))
    }

    clickClose = () => () => {
        this.setState({
            showMemberPopup : false,
            showExitPopup : false,
            showInviteMessagePopup : false,
            FriendNames : [],
        })
    }

    clickfriendName = (name)=>{
        let newlist = this.state.FriendNames.filter(x=> x!==name)
        if(newlist.length === this.state.FriendNames.length){
            newlist= newlist.concat(name)
        }
        this.setState({FriendNames : newlist})
    }

    render() {
        let FriendListShown = this.state.friendlist.map((value,index) => {
            return (
                <div className='d-flex mt-2' key={index}>
                    <div className='badge-custom t-center'>{value.firstword}</div>
                    {value.name}
                    <input type="checkbox" className='friend-add-button' id="friendcheckbox"
                    onClick={()=>this.clickfriendName(value.name)}></input>
                </div>
            );
            })
        let AddMemberPopup = 
        <Modal show={this.state.showMemberPopup} onHide={this.clickClose()} className='AddMemberPopup'>
            <Modal.Header closeButton>
                <Modal.Title>Add Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex'>
                    <div className='w-40'>
                    Friend list
                    </div>
                    <div>
                        {(this.state.loadFriendSuccess) ? FriendListShown : <div>No Friends Available</div>}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" id="closeAddMember" onClick={this.clickClose()}>
                Cancel
                </Button>
                <Button variant="primary" id="confirmAddMember" onClick={this.sendInviteFriend()}>
                Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    
        return (
            <div className='d-flex h-100 Friends'>
                {AddMemberPopup}
                
                <ModalPopup show={this.state.showExitPopup}
                               modalTitle={'Exit Group'}
                               content={'Really want to leave the group?'}
                               buttonConfirm={'Confirm'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.clickExitConfirm()}
                />

                <AddFriendMessagePopup show={this.state.showInviteMessagePopup}
                                modalTitle={this.state.AddFriendMessageTitle}
                                content={this.state.AddFriendMessageContent}
                                buttonConfirm={'OK'}
                                isSuccess={this.state.addFriendSuccess}
                                clickClose={this.clickClose()}
                                clickConfirm={this.clickClose()}
                />

                <div className='w-80 mt-5' id="group_body">
                    <div className='d-flex'>
                        <div className='w-50 page-title pl-5'>{this.state.groupName} Leaderboard</div>
                        <div className='w-10'></div>
                        <div className='w-20'>
                            <button onClick={this.clickInviteFriend()} id="AddMemberButton" className='w-80 button-blue'>Invite friends</button>
                        </div>
                        <div className='w-20'>
                            <button onClick={this.clickExitGroup()} id="ExitGroupButton" className='w-80 button-red'>Exit group</button>
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

export default connect(null,null)(withRouter(Group));