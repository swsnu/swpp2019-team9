import React, { Component } from 'react';
import '../Friends.css'
import EditCommentPopup from "./PopupComment";
import DeleteCommentPopup from "./PopUpModal";
import axios from 'axios'
import { withRouter } from 'react-router';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
class CommentSection extends Component {
    constructor (props)
    {
        super(props);
        this.state={
            showEditCommentPopup : false,
            showDeleteCommentPopup : false,
            group_id : 0,
            commentsList : [],
            NewComment : "",
            WorkingID : -1,
            EditingComment : {},
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

    clickClose = () => () => {
        this.setState({
            showEditCommentPopup : false,
            showDeleteCommentPopup : false,
            WorkingID : -1,
            EditingComment : {},
        })
    }

    clickCreateComment = () => () => {
        axios.post("/api/comment/"+this.state.group_id+"/", {content : this.state.NewComment})
         .then((res) => {
             let newcomment_list = this.state.commentsList.concat(res.data)
             this.setState({commentsList : newcomment_list, NewComment:""})
         })
    }

    clickDeleteComment = (id) => {
        this.setState({
            showDeleteCommentPopup : true,
            WorkingID : id,
        })
    }

    confirmDeleteComment = ()=> () => {
        axios.delete("/api/comment/delete/"+this.state.WorkingID+"/")
        .then(()=>{
            const deleted = this.state.commentsList.filter((cm) => {
                return cm.id !== this.state.WorkingID;
            })
            this.setState({
                commentsList : deleted,
                showDeleteCommentPopup : false,
                WorkingID : -1,
            })
        })
    }

    clickEditComment = (index) => {
        this.setState({
            showEditCommentPopup : true,
            WorkingID : this.state.commentsList[index].id,
            EditingComment : this.state.commentsList[index],
        })
    }

    confirmEditComment = () => () => {
        axios.put("/api/comment/"+this.state.group_id+"/",{
            "content" : this.state.EditingComment.content,
            "id" : this.state.EditingComment.id
        })
        .then(()=>{
            const modified = this.state.commentsList.map((cm) =>{
                    if(cm.id === this.state.WorkingID){
                        return this.state.EditingComment
                    }else{
                        return cm;
                    }
            })
            this.setState({
                commentsList : modified,
                showEditCommentPopup : false,
                WorkingID : -1,
                EditingComment : {},
            })
        })
    }

    Commentdisable = () =>{
        if(this.state.NewComment === "")
            return true
        else
            return false
    }

    CommentOwner = (c) => {
        return c !== this.props.Mynickname
    }

    CommentChange = (e) =>{
        this.setState({
            EditingComment : {...this.state.EditingComment, content : e.target.value}
        })
    }

    render() {
        return (
                <div className='pl-5 mt-10' id="CommentSection">
                    <EditCommentPopup  show={this.state.showEditCommentPopup}
                               modalTitle={'Modifiy Comment'}
                               content={this.state.EditingComment.content}
                               buttonConfirm={'Modifiy'}
                               clickClose={this.clickClose()}
                               clickConfirm={this.confirmEditComment()}
                               changeContent={this.CommentChange}
                    />

                    <DeleteCommentPopup show={this.state.showDeleteCommentPopup}
                                modalTitle={'Delete Comment'}
                                content={'Really want to Delete Comment?'}
                                buttonConfirm={'Confirm'}
                                clickClose={this.clickClose()}
                                clickConfirm={this.confirmDeleteComment()}
                    />
                    <div className='f-large'>Comments</div>
                    <div className='w-100 d-flex comments-list'></div>
                    <div>
                        {(this.props.Mynickname != null) ?
                        (this.state.commentsList.map((value,index) => {
                            return (
                                <div key={index} className='w-100 d-flex group-item-list'
                                >
                                    <div className='w-25 d-flex d-ho-center'>
                                        <div className='badge-custom '>{value.firstword}</div>
                                        {value.name}
                                    </div>
                                    <div className='w-35 word-break' id="comment_content">{value.content}</div>
                                    <div className='w-20'>{value.reg_date}</div>
                                    <div className='d-flex w-20'>
                                        <div className='hover-pointer'>
                                            <MaterialIcon icon="edit" size={30}
                                                          onClick={() => this.clickEditComment(index)}
                                                          disabled={this.CommentOwner(value.name)}
                                                          hidden={this.CommentOwner(value.name)}
                                            />
                                        </div>
                                        {/*<button className='w-50 button-blue'*/}
                                            {/*id="edit_button"*/}
                                        {/*>Edit</button>*/}
                                        <div className='hover-pointer'>
                                            <MaterialIcon icon="delete" size={30}
                                                          id="delete_button"
                                                          onClick={() => this.clickDeleteComment(value.id)}
                                                          disabled={this.CommentOwner(value.name)}
                                                          hidden={ this.CommentOwner(value.name)}
                                                          />
                                        </div>
                                        {/*<button className='w-50 button-red'*/}
                                            {/**/}
                                        {/*>Delete</button>*/}
                                    </div>

                                </div>
                            );
                        })) : null
                    }
                    </div>
                <div className='pl-5 pr-5'>
                    <div  className='w-100 d-flex group-comment-my'>
                        <div className='w-10'></div>
                        <div className='w-60'>
                            <input placeholder=' Comments something...' className='w-80 group-comment-input'
                            id="new_comment_input"
                            value = {this.state.NewComment}
                            onChange={event => this.setState({NewComment: event.target.value})}
                            />
                        </div>
                        <button className='w-20 button-blue'
                        id="post_comment"
                        onClick={this.clickCreateComment()}
                        disabled = {this.Commentdisable()}
                        >Comment</button>
                    </div>
                </div>
                </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        Mynickname : state.login.nickname
    }
}

CommentSection.propTypes={
    Mynickname:PropTypes.string,
}

export default connect(mapStateToProps,null)(withRouter(CommentSection));
