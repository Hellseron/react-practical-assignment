import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row, Pagination} from "antd"
import PostCard from "../PostCard";
import {setPageNumber} from "../../../actions/posts";

const PostList = ({openModal}) => {
    const posts = useSelector(({posts}) => posts.posts)

    const dispatch = useDispatch()


    const renderPosts = (posts) => {
        return posts.map((post) => {
            return (
                <Col key={post.id} lg={8} md={12} xs={24}>
                    <PostCard openModal={openModal} post={post}/>
                </Col>
            )
        })
    }

    if (!posts.result) {
        return <div> loading ...</div>
    }

    return (


        <Wrapper>
            {
                posts.result.length > 0 ?
                    <>
                        <Row>
                            {renderPosts(posts.result)}
                        </Row>

                        <PaginationWrapper>
                            <Pagination onChange={(page) => dispatch(setPageNumber(page))} total={posts.total}
                                        defaultPageSize={9}/>
                        </PaginationWrapper>
                    </> : <NoPosts> NO POSTS</NoPosts>
            }


        </Wrapper>


    )
}


const Wrapper = styled.div`
  padding: 50px 0;
`

const PaginationWrapper = styled.div`
  padding: 0 70px;
`
const NoPosts = styled.div`
  text-align: center;
  font-size: 26px;
`
export default PostList