import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Col,Row, Button, Input,Form, Modal, Upload} from "antd"
import { SearchOutlined } from '@ant-design/icons';
import {handleModal} from "../../actions/modal";
import {searchPosts} from "../../actions/posts";
import debounce from 'lodash.debounce';


const TopBlock = ({openModal}) => {
    const dispatch = useDispatch()
    const [searchText,setSearchText] = useState(null)
    const page = useSelector(({posts}) => posts.page)


    const toggleModal = (isEdit,isComment) => {
        dispatch(handleModal({isEdit, isComment}))
        openModal(true)
    }
    const debounceSearch = useMemo(()=>{
        return debounce(()=>dispatch(searchPosts(searchText, page)), 800)
    },[searchText])


    const onChangeInput =(e)=>{
        setSearchText(e.target.value)
    }

    useEffect(()=>{
        if(searchText!==null){
            debounceSearch()
        }
    }, [searchText])

    const searchButton =
        <SearchButton  onClick={()=>{
        if(searchText!==null){
            dispatch(searchPosts(searchText, page))
        }
    }}>
            <SearchOutlined/>
        </SearchButton>


    return(
        <Wrapper>
            <Row justify={"space-between"}>
                <Col md={12}>
                        <StyledButton type="primary" onClick={()=>toggleModal(false,false)}>
                            ADD POST
                        </StyledButton>
                </Col>
                <Col  md={8}>
                        <Search>
                            <Input.Search
                                onChange={onChangeInput}
                                          placeholder="Search"
                                          enterButton={searchButton}
                            />
                        </Search>
                </Col>
            </Row>


        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 20px 50px 0 50px;
 
`

const StyledButton = styled(Button)`
`

const Search = styled.div`
  font-size: 16px;
  .ant-btn{
    padding: 0;
  }
  
`
const StyledTextArea = styled.div
const SearchButton = styled.div`
    padding:  0 15px;
`
export default TopBlock