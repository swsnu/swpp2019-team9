import React, { Component } from 'react';
import axios from 'axios';
import './Friends.css'
import AddGroupPopup from "./component/PopupFilled";
import AddGroupMessagePopup from "./component/PopupMessage";
import FriendsBar from '../components/component/FriendsBar'
import PropTypes from 'prop-types';
class Friends extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showAddGroupPopup : false,
            showAddGroupMessagePopup : false,
            AddGroupMessageTitle : '',
            AddGroupMessageContent: '',
            addGroupSuccess: false,
            groupListLoaded : false,
            groupList : [],
            groupName : '',

        }
    }

    componentDidMount(){
        this.onGetGroupList()
    }
    onGetGroupList=()=>{
        axios.get('/api/group/')
            .then(res=>{
                this.setState({groupList: res.data.map((value)=>{
                    return { 'id': value.gid, 'firstword' : value.groupname[0], 'name': value.groupname, 'num':value.num, 'TopFever': value.TopFever}
                }), groupListLoaded: true})
                  
            })
    }

    clickAddGroup = () => () => {
        this.setState({
            showAddGroupPopup : true,
        })
    }
    clickAddGroupConfirm = () => () => {
        if(this.state.groupName.length <=32){
            axios.post('/api/group/',{'groupname':this.state.groupName})
                .then(()=>{
                    this.setState({
                        showAddGroupPopup : false,
                        showAddGroupMessagePopup : true,
                        addGroupSuccess : true,
                        AddGroupMessageTitle : 'Created group',
                        AddGroupMessageContent : 'Successfully created new group',
                        groupName : '',
                    })
                    this.onGetGroupList()
                })
                .catch((error)=>{
                    if(error.response.status===403)
                        this.setState({
                            showAddGroupPopup : false,
                            showAddGroupMessagePopup : true,
                            addGroupSuccess : false,
                            AddGroupMessageTitle : 'Failed to create group',
                            AddGroupMessageContent : 'Group name exists',
                            groupName : '',
                        })
                })
        }
        else{
            this.setState({
                showAddGroupPopup : false,
                showAddGroupMessagePopup : true,
                addGroupSuccess : false,
                AddGroupMessageTitle : 'Failed to create group',
                AddGroupMessageContent : 'Name is too long',
                groupName : '',
            })
        }
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

    goGroup = (id) => () => {
        this.props.history.push('/group/'+id)
    }
    clickMessageClose= () =>{
        this.setState({
            showAddGroupMessagePopup : false,
            AddGroupMessageTitle : '',
            AddGroupMessageContent: ''
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
                <AddGroupMessagePopup show={this.state.showAddGroupMessagePopup}
                                modalTitle={this.state.AddGroupMessageTitle}
                                content={this.state.AddGroupMessageContent}
                                buttonConfirm={'OK'}
                                isSuccess={this.state.addGroupSuccess}
                                clickClose={this.clickMessageClose}
                                clickConfirm={this.clickMessageClose}
                />
                <div className='w-80 mt-5'>
                    <div className='d-flex'>
                        <div className='w-50 page-title pl-5'>Friends</div>
                        <div className='w-20'></div>
                        <div className='w-20'>
                            <button id='add-group-button' onClick={this.clickAddGroup()} className='w-80 button-blue'>Add Group</button>
                        </div>
                    </div>
                    <div className='d-flex mt-5 pl-5'>
                        <div className='w-100 d-flex title-list'>
                            <div className='w-50'>Name</div>
                            <div className='w-50'>Top Fever</div>
                        </div>
                    </div>
                    <div className='pl-5'>
                        {(this.state.groupListLoaded) ? 
                        <div>
                            {this.state.groupList.map((value,index) => {
                                return (
                                    <div key={index} onClick={this.goGroup(value.id)} className='w-100 d-flex friend-item-list' id='group-name'>
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
                        : <div>please refresh</div>}
                    </div>
                </div>
                <FriendsBar  history={this.props.history}/>
            </div>
        )
    }
}
Friends.propTypes={
    history:PropTypes.object,
}
export default Friends;