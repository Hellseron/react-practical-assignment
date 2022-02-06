import React, {useState, createElement} from "react";
import styled from "styled-components";
import {Comment, Tooltip, Avatar, Collapse} from 'antd';
import {deleteComment} from "../../../actions/comments";
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



const CommentCard=({comment, openModal, handleEditModal, toggleLike})=>{
    const dispatch = useDispatch()
    const {date, dislikes, id, likes, text, username } = comment
    const activeUser = useSelector(({user}) => user.userName)
    const page = useSelector(({posts}) => posts.page)
    const [action, setAction] = useState(null);
    const commentDate = moment(+date).format("DD MMM YYYY hh:mm")

    const actions = [
        <span onClick={()=>
        {
            toggleLike(false, true, likes, dislikes,  text, id, page)
            setAction('liked')
        }
            }>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
      </span>,
        <span onClick={()=>
        {
            toggleLike(false, false, likes, dislikes,  text, id, page)
            setAction('disliked')
        }

        }>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
      </span>,
        <span> Votes: {likes.length - dislikes.length} </span>
    ];


    return(
            <Wrapper>
                <StyledComment
                    actions={actions}
                    author={<a>{username}</a>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                    content={
                        <>
                            <p>
                                {text}
                            </p>
                        </>

                    }
                    datetime={
                        <span>{commentDate}</span>
                    }>
                    {activeUser === username &&
                        <IconsWrapper>
                            <EditOutlined
                                onClick={() => handleEditModal(true, true, {title: text,  id, likes, dislikes}, openModal)}/>
                            <DeleteOutlined onClick={() => dispatch(deleteComment(id, page))}/>
                        </IconsWrapper>
                    }

                </StyledComment>

            </Wrapper>
        )

}


const Wrapper = styled.div`
  padding: 5px;

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

export default CommentCard