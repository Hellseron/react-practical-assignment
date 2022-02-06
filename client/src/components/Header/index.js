import React from "react";
import styled from "styled-components";
import {Button} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {logOut} from "../../actions/user";
import {useNavigate} from "react-router-dom"

const Index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userName = useSelector(({user})=>user.userName)
    return (
        <Wrapper>
            <UserNameBlock>
                {`Welcome, ${userName}`}
            </UserNameBlock>
                <Button type="primary" onClick={()=>{
                    dispatch(logOut())
                    navigate("/")
                }} >
                    LOGOUT
                </Button>

        </Wrapper>
    )
}

const Wrapper = styled.div`
  height: 100px;
  background-color: #4cbdc5;
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const UserNameBlock = styled.div`
    color: whitesmoke;
    font-size: 22px;
`


export default Index