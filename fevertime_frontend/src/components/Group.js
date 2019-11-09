import React, { Component } from 'react';
import './Friends.css'
import AddMemberPopup from "./component/PopupFilled";
import EditCommentPopup from "./component/PopupComment";
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
            showEditCommentPopup : false,
            showDeleteCommentPopup : false,
            group_id : 0,
            groupMemberList : [
                {rank : 1, firstword : 'Y', name : 'Youngjae', fever_time : '11:10:01'},
                {rank : 2, firstword : 'G', name : 'Gildong', fever_time : '09:10:01'},
                {rank : 3, firstword : 'Y', name : 'Youngjae', fever_time : '05:10:01'},
            ],
            commentsList : [],
            FriendName : '',
            NewComment : "",
            EditComment : -1,
            MyInfo : this.props.Mynickname
        }
    }
    componentDidMount(){
        this.setState({group_id : parseInt(window.location.href.split("/")[4],10)})
        this.getCommentList()

    }

    getCommentList = () =>{
        let group_id=parseInt(window.location.href.split("/")[4],10)
        axios.get("/api/comment/"+group_id+"/")
        .then(res => {
            this.setState({commentsList:res.data})
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

    FriendNameChange = (e) =>(e) =>{
        this.setState({
            FriendName : e
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
            showCommentPopup : false,
            FriendName : '',
            EditComment : -1,            
        })
    }

    clickCreateComment = () => () => {
        axios.post("/api/comment/"+this.state.group_id+"/", {content : this.state.NewComment})
         .then((res) => {
             let newcomment_list = this.state.commentsList.concat(res.data)
             this.setState({commentsList : newcomment_list})
         })
    }

    clickDeleteComment = ()=> () => {
        this.setState({
            showDeleteCommentPopup : true,
        })
    }

    confirmDeleteComment = ()=> () => {
        this.setState({
            showDeleteCommentPopup : true,
        })
    }

    clickEditComment = (index) => (index) => {
        console.log(index)
        this.setState({
            showEditCommentPopup : true,
            EditComment : index,
        })
    }

    Commentdisable = () =>{
        if(this.state.NewComment === "")
            return true
        else
            return false
    } 

    CommentOwner = (c) => {
        return c !== this.state.MyInfo
    }

    Commentinput = () =>() =>{
        return this.state.Ed
    }

    CommentChange = (e) =>(e) =>{
        this.setState({
            EditComment : e
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
                               changeContent={this.FriendNameChange()}
                />
                
                <ModalPopup show={this.state.showExitPopup}
                               modalTitle={'Exit Group'}
                               content={'Really want to leave the group?'}
                               buttonConfirm={'Confirm'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.clickExitConfirm()}
                />

                <EditCommentPopup  show={this.state.showEditCommentPopup}
                               modalTitle={'Modifiy Comment'}
                               //content={this.state.commentsList[this.state.EditComment].content}
                               buttonConfirm={'Modifiy'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.clickEditComment()}
                               changeContent={this.CommentChange()}
                />  

                <ModalPopup show={this.state.showDeleteCommentPopup}
                               modalTitle={'Delete Comment'}
                               content={'Really want to Delete Comment?'}
                               buttonConfirm={'Confirm'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.confirmDeleteComment()}
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