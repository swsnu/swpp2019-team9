import React, { Component } from 'react';
import axios from 'axios';
import AddFriendPopup from "./PopupFilled";
import PropTypes from 'prop-types';
class FriendsBar extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddFriendPopup: false,
            showMyFriend : true,
            friendname : '',
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

        }
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
    clickAcceptRequest = (name)=>{
        axios.post('/api/friend/real/', {'nickname': name})
    }
    clickDeclineRequest = (name)=>{
        axios.delete('/api/friend/request/', {'nickname': name})
    }
    clickAddFriend = () =>{
        this.setState({showAddFriendPopup:true})
    }
    clickClose = () =>{
        this.setState({
            showAddFriendPopup : false,
            friendname : ''
        })
    }
    friendNameChange = (e) =>{
        this.setState({
            friendname: e.target.value
        })
    }
    clickAddFriendConfirm = () =>{
        if(this.state.friendname ===''){
            alert('insert name!')
        }
        else{
            axios.post('/api/friend/request/',{'nickname':this.state.friendname})
            this.setState({
                showAddFriendPopup : false,
                friendname : '',
            })
        }
    }
    render() {
        return (
            <div className='w-20 fri-list p-relative'>
                <AddFriendPopup show={this.state.showAddFriendPopup}
                            modalTitle={'Add Friend'}
                            content={'Friend name'}
                            buttonConfirm={'Send request'}
                            clickClose={this.clickClose}
                            clickConfirm={this.clickAddFriendConfirm}
                            changeContent={this.friendNameChange}
                />
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
                                        <button onClick={()=>this.clickAcceptRequest(value.name)}>O</button>
                                        <button onClick={()=>this.clickDeclineRequest(value.name)}>X</button>
                                    </div>
                                );
                            })}
                        </div>)}

                </div>
                <div className='add-friend-button-wrapper'>
                    <button className='mt-3 w-100 button-blue' onClick={this.clickAddFriend}>Add friend</button>
                </div>
            </div>
        )
    }
}
export default FriendsBar;