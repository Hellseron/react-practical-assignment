import React, {useState,useEffect} from "react";
import styled from "styled-components";
import { Form, Input, Button, Checkbox } from 'antd';

const LoginForm = ({login}) => {
    const [userName,setUserName] = useState("")
    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    return(
        <Wrapper>
            <Form
                onChange={handleChange}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={()=>login(userName)}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 14,
                    }}
                >
                    <LogButton type="primary" htmlType="submit">
                        Log In
                    </LogButton>
                </Form.Item>
            </Form>
        </Wrapper>

    )
}
const Wrapper = styled.div`
`
const LogButton = styled(Button)`
    width: 100px
`
export default LoginForm