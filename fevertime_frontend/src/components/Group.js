import React, { Component } from 'react';
import './Friends.css'
import AddFriendMessagePopup from "./component/PopupMessage";
import ModalPopup from "./component/PopUpModal";
import FriendsBar from './component/FriendsBar'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import CommentSection from "./component/CommentSection"
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';

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
            leaderboard_week : "",
            week_delta : 0,
            fever_tag : "All",
            search_input : "",
            autocomplete_tag : [{label : "All"}]
        }
    }
    componentDidMount(){
        let group_id=parseInt(window.location.href.split("/")[4],10)
        this.setState({group_id : group_id})
        this.getLeaderboard(group_id, 0, "All")
    }

    getLeaderboard=(group_id, week_delta, fever_tag)=>{
        axios.get("/api/group/leaderboard/"+group_id+"/"+week_delta+"/"+fever_tag+"/")
        .then(res => {
            this.setState({
                groupMemberList : res.data.leaderboard,
                leaderboard_week : res.data.time,
                autocomplete_tag : res.data.autotag,
            })
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
                    this.getLeaderboard(this.state.group_id, this.state.week_delta, "All")
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

    clickPrevMonth =()=>()=>{
        this.getLeaderboard(this.state.group_id,this.state.week_delta+4, this.state.fever_tag)
        this.setState({week_delta : this.state.week_delta+4})
        
    }

    clickPostMonth =()=>()=>{
        if(this.state.week_delta -4 >=0){
            this.getLeaderboard(this.state.group_id,this.state.week_delta-4, this.state.fever_tag)
            this.setState({week_delta : this.state.week_delta-4})
        }
        else if (this.state.week_delta !== 0){
            this.getLeaderboard(this.state.group_id,0, this.state.fever_tag)
            this.setState({week_delta : 0})
        }
        
    }

    clickPrevWeek =()=>()=>{
        this.getLeaderboard(this.state.group_id,this.state.week_delta+1, this.state.fever_tag)
        this.setState({week_delta : this.state.week_delta+1})
    }

    clickPostWeek =()=>()=>{
        if(this.state.week_delta -1 >=0){
            this.getLeaderboard(this.state.group_id,this.state.week_delta-1, this.state.fever_tag)
            this.setState({week_delta : this.state.week_delta-1})
        }
    }
    
    tagSearch = ()=>()=>{
        if(this.state.search_input === ""){
            this.getLeaderboard(this.state.group_id,this.state.week_delta, "All")
            this.setState({fever_tag : "All"})
        }
        else{
            this.getLeaderboard(this.state.group_id,this.state.week_delta, this.state.search_input)
            this.setState({fever_tag : this.state.search_input})   
        }
        
    }

    render() {
        let FriendListShown = this.state.friendlist.map((value,index) => {
            return (
                <div className='d-flex mt-2 friend-add-button-wrapper' key={index}>
                    <input type="checkbox" className='friend-add-button' id="friendcheckbox"
                           onClick={()=>this.clickfriendName(value.name)}></input>
                    <div className='badge-custom t-center'>{value.firstword}</div>
                    {value.name}
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

                <div className='w-80 mt-5 group-body' id="group_body">
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
                    <div className='d-flex mt-3 d-v-center'>
                        <div className='w-5'></div>
                        <Autocomplete 
                        className='w-20 input-1'
                        id="Tag_input"
                        getItemValue={(item) => item.label}
                        items={this.state.autocomplete_tag}
                        renderItem={(item, isHighlighted) =>
                          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                          </div>
                        }
                        value={this.state.search_input}
                        onChange={(e) => this.setState({search_input : e.target.value})}
                        onSelect={(val) => this.setState({search_input : val})}
                        />
                        <button className='' id="search_button"
                            onClick={this.tagSearch()}
                            >Search</button>
                    </div>
                    <div className='d-flex mt-2 pl-5 d-v-center d-ho-center'>                        
                        <div className='d-flex leaderboard-nav'>
                            <button className='nav-button' id="prev_month"
                            onClick={this.clickPrevMonth()}
                            > {"<<"} </button>
                            <button className='nav-button' id="prev_week"
                            onClick={this.clickPrevWeek()}
                            > {"<"} </button>
                        </div>
                            <div className="w-80 t-center">{this.state.fever_tag}:{this.state.leaderboard_week}</div>
                        <div className='d-flex leaderboard-nav'>
                            <button className='nav-button' id="next_week"
                            onClick={this.clickPostWeek()}
                            >&gt;</button>
                            <button className='nav-button' id="next_month"
                            onClick={this.clickPostMonth()}
                            >&gt;&gt;</button>
                        </div>
                    </div>
                    <div className='mt-2 d-flex pl-5'>                        
                        <div className='w-100 d-flex title-list'>
                            <div className='w-20'>Rank</div>
                            <div className='w-30'>Name</div>
                            <div className='w-50'>Fever Time</div>
                        </div>
                    </div>
                    <div className='mt-2 pl-5 mb-5'>
                        <div>
                            {this.state.groupMemberList.map((value,index) => {
                                return (
                                    <div key={index} className='w-100 d-flex group-item-list'>
                                        <div className='w-20'>{value.rank}</div>
                                        <div className='w-30 d-flex d-ho-center'>
                                            <div className='badge-custom '>{value.firstword}</div>
                                            <Link to={"/mydata/"+value.id}>{value.name}</Link>
                                        </div>
                                        <div className='w-50'>{value.fever_time}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <CommentSection/>
                </div>
                <FriendsBar history={this.props.history}/>
            </div>
        )
    }
}
Group.propTypes={
    history:PropTypes.object,
}
export default connect(null,null)(withRouter(Group));
