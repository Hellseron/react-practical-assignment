import React, {useState, createElement} from "react";
import styled from "styled-components";
import {Comment,  Avatar, Collapse, Row, Col} from 'antd';
import {
    deletePost,
    updatePost
} from "../../../actions/posts";
import {handleModal} from "../../../actions/modal";
import {updateComment} from "../../../actions/comments";

import {useSelector, useDispatch} from "react-redux";
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import moment from "moment";
import {CommentList} from "../../../components";


const PostCard = ({post, openModal}) => {
    const {Panel} = Collapse;
    const dispatch = useDispatch()
    const {comments, date, dislikes, id, likes, title, username, imageSrc} = post
    const activeUser = useSelector(({user}) => user.userName)
    const page = useSelector(({posts}) => posts.page)
    const modalData = useSelector(({modal}) => modal.data)
    const [action, setAction] = useState(null);
    const postDate = moment(+date).format("DD MMM YYYY hh:mm")
    const doDeletePost = (id, page) => {
        dispatch(deletePost(id, page))
    }


    const toggleLike=(isPost, isLike, likes, dislikes,  text, id, page)=>{

        let likesSet = new Set(likes)
        let dislikesSet = new Set(dislikes)

        if(isLike){
            likesSet.add(activeUser)
            if (dislikesSet.has(activeUser)) {
                dislikesSet.delete(activeUser)
            }
        }else{
            dislikesSet.add(activeUser)
            if (likesSet.has(activeUser)) {
                likesSet.delete(activeUser)
            }
        }
        const newDislikesArr = Array.from(dislikesSet)
        const newLikesArr = Array.from(likesSet)

        if(isPost){
            dispatch(updatePost(text, id, newLikesArr, newDislikesArr, page))
        }else{
            dispatch(updateComment(text, id, newLikesArr, newDislikesArr, page))
        }

    }



    const handleEditModal = (isEdit, isComment, data, openModal) => {
        dispatch(handleModal({isEdit, isComment, data}))
        openModal(true)
    }

    const handleAddModal = (isEdit, isComment, data) => {
        dispatch(handleModal({isEdit, isComment, data}))
        openModal(true)
    }


    const actions = [
        <span onClick={()=>
        {
            toggleLike(true, true, likes, dislikes, title, id, page)
            setAction( 'liked');
        }

        }>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
      </span>,
        <span onClick={()=> {
            toggleLike(true, false, likes, dislikes, title, id, page)
            setAction( 'disliked');
        }}>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
      </span>,
        <span> Votes: {likes.length - dislikes.length} </span>,
        <span onClick={() => handleAddModal(false, true, {...modalData, id})}
              key="comment-basic-reply-to">Reply to</span>,
    ];


    return (
        <Wrapper>
            <StyledComment
                actions={actions}
                author={<a>{username}</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                content={
                    <>
                        <p>
                            {title}
                        </p>
                        {imageSrc &&
                            <ImgWrapper>
                                <img src={imageSrc} alt=""/>
                            </ImgWrapper>
                        }
                    </>

                }
                datetime={
                    <span>{postDate}</span>
                }>
                {activeUser === username &&
                    <IconsWrapper>
                        <EditOutlined
                            onClick={() => handleEditModal(true, false, {
                                title,
                                imageSrc,
                                id,
                                likes,
                                dislikes
                            }, openModal)}/>
                        <DeleteOutlined onClick={() => doDeletePost(id, page)}/>
                    </IconsWrapper>
                }

            </StyledComment>

            {
                comments.length > 0 &&
                <Row>
                    <Col md={22} offset={2}>
                        <StyledCollapse>
                            <Panel header={`Show ${comments.length} replies`}>
                                <CommentList toggleLike={toggleLike} commentList={comments} handleEditModal={handleEditModal}
                                             openModal={openModal}/>

                            </Panel>

                        </StyledCollapse>
                    </Col>
                </Row>
            }


        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 20px 30px;
`
const StyledComment = styled(Comment)`
  position: relative;

  .ant-comment-avatar {
    cursor: default;
  }

  .ant-comment-content-author {
    a {
      cursor: default;
    }
  }
`
const IconsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  span {
    margin: 0 5px;
  }
`
const ImgWrapper = styled.div`
  margin-top: 10px;

  img {
    width: 100%;
    object-fit: contain;
  }
`


const StyledCollapse = styled(Collapse)`
  
  .ant-collapse-content-box{
    max-height: 300px;
    overflow: auto;
  }
 
`
export default PostCard