import React, { Component } from 'react';
import './Friends.css'
import AddGroupPopup from "./component/PopupFilled";
import FriendsBar from '../components/component/FriendsBar'
import PropTypes from 'prop-types';
class Friends extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddGroupPopup : false,
            groupList : [
                {id: 1,firstword : 'A', name : 'GroupA', num: 4, TopFever : 'Youngjae'},
                {id: 2, firstword : 'G', name : 'Gildong', num: 2, TopFever : 'Gildong'},
                {id: 3, firstword : 'D', name : 'GroupD', num: 4, TopFever : 'Youngjae'},
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
    goGroup = (id) => () => {
        this.props.history.push('/group/'+id)
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
                                    <div key={index} onClick={this.goGroup(value.id)} className='w-100 d-flex friend-item-list'>
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
                <FriendsBar />
            </div>
        )
    }
}
Friends.propTypes={
    history:PropTypes.object,
}
export default Friends;