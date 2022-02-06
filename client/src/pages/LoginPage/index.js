import React from "react";
import styled from "styled-components";
import {LoginForm} from "../../components";
import {Row,Col} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {loginAuth} from "../../actions/user";
import {Navigate} from "react-router-dom";
import background from "./assets/background.jpg"


const LoginPage = () => {
    const dispatch = useDispatch()
    const userName = useSelector(({user}) => user.userName)



    const login = (userName) => dispatch(loginAuth(userName))

    if(userName){
        return <Navigate to={"/main"}/>
    }
        return (
            <Wrapper backGround={background}>
                <AntRow justify="center">
                    <Col md={12} xs={20}>
                        <LoginForm login={login}/>
                    </Col>
                </AntRow>
            </Wrapper>

        )
}

const AntRow = styled(Row)`
    label{
      font-size: 22px;
      font-family: Arial, sans-serif;
    }
`
const Wrapper = styled.div`
  height: 100vh;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.backGround});
`
export default LoginPage