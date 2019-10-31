import React, { Component } from 'react';

class FriendsBar extends Component {
    constructor (props)
    {
        super(props);
        this.state={
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
    render() {
        return (
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
        )
    }
}
export default FriendsBar;