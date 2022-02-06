import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../actions/posts";
import {PostList, Header, TopBlock, ModalWindow} from "../../components";
import {Navigate} from "react-router-dom";


const UserPage = () => {
    const dispatch = useDispatch()
    const page = useSelector(({posts}) =>posts.page)
    const [isModalOpen, setModalOpen] = useState(false)
    const userName = useSelector(({user}) => user.userName)

    useEffect(()=>{
        dispatch(getPosts(page))
    },[page])

    if(!userName){
        return <Navigate to={"/"}/>
    }
    return(
        <PageWrapper>
            <Header/>
            <TopBlock openModal={setModalOpen} />
            <BlockWrapper>
                <PostList openModal={setModalOpen}/>
            </BlockWrapper>
            <ModalWindow visible={isModalOpen} setVisible={setModalOpen} />
        </PageWrapper>

    )
}
const PageWrapper = styled.div`
  
`
const BlockWrapper = styled.div`
  padding: 0 20px;
`

export default UserPage
