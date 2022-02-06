import React from "react"
import styled from "styled-components"
import {CommentCard} from "../../../components";


const CommentList = ({commentList, openModal, handleEditModal, toggleLike}) => {


    const renderComments= (list)=>{
       return  list.map(comment=>{
            const data={
                date: comment.date,
                dislikes: comment.dislikes,
                id: comment.id,
                likes: comment.likes,
                text: comment.text,
                username: comment.username
            }
            return <CommentCard toggleLike={toggleLike} handleEditModal={handleEditModal} openModal={openModal} comment={data} key={'comment'+comment.id}/>
        })
    }


    return(
        <Wrapper>
            {renderComments(commentList)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  
`

export default CommentList