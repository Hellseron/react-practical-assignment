import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Form, Modal, Upload} from "antd"
import {createPost, updatePost} from "../../../actions/posts";
import {handleModal} from "../../../actions/modal";
import {PlusOutlined} from '@ant-design/icons';
import {createComment, updateComment} from "../../../actions/comments";

const ModalWindow= ({visible, setVisible}) => {
    const dispatch = useDispatch()

    const userName = useSelector(({user}) => user.userName)
    const page = useSelector(({posts}) => posts.page)
    const modalData= useSelector(({modal})=> modal.data)
    const isEdit = useSelector(({modal})=> modal.isEdit)
    const isComment = useSelector(({modal})=> modal.isComment)

     const {title, id, imageSrc, likes, dislikes} = modalData



    const [textArea, setText] = useState(isEdit ? title : "")
    const [file, setFile] = useState(null)

    useEffect(() => {
        setText(title)
    }, [title])


    const handleChangeText = (e) => {
        setText(e.target.value)
    }
    const clearData = () => {
        setText("")
        setFile(null)
        dispatch(handleModal({data: {}}))
        // dispatch(setEditingPost({}))
    }

    //adding and updating posts
    const handlePosting = (isEdit, isComment, title, id, name, page, likes, dislikes, file) => {
        let formData = new FormData()
        if (file) {
            formData.append("picture", file)

        }

        if (isEdit) {
            if(isComment){
                dispatch(updateComment(title,id,likes,dislikes,page))
            }else {
                dispatch(updatePost(title, id, likes, dislikes, page, file && formData))
            }

        } else {
            if(isComment){
                dispatch(createComment(title, id, name, page))
            }else {
                dispatch(createPost(title, name, page, file && formData))
            }

        }
        clearData()
        setVisible(false)
    }


    const renderTitle=(isEdit, isComment)=>{
        if(isEdit){
            return `Edit your ${isComment? 'comment': 'post'}`
        }else{
            return `Create new ${isComment? 'comment': 'post'}`
        }
    }

    const renderButtonText=(isEdit, isComment)=>{
        if(isEdit){
            return `Update  ${isComment? 'comment': 'post'}`
        }else{
            return `Create ${isComment? 'comment': 'post'}`
        }
    }


    const renderUploadImg= ()=>{
        return(
            <Upload
                listType="picture-card"
                maxCount={1}
                accept=".jpg,.jpeg,.png"
                onRemove={() => setFile(null)}
                beforeUpload={() => false}
                onChange={({file, fileList}) =>{
                    dispatch(handleModal({data: {...modalData, imageSrc: ''}}))
                    setFile(fileList[0].originFileObj)}
                }
            >
                {imageSrc ? <img src={imageSrc} alt="avatar" style={{width: '100%'}}/> :
                    <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Upload</div>
                    </div>
                }

            </Upload>
        )
    }

    return (
        <Wrapper>

            <Modal
                title={renderTitle(isEdit, isComment)}
                centered
                visible={visible}
                destroyOnClose={true}
                onCancel={() => {
                    clearData()
                    setVisible(false)
                }
                }
                width={1000}
                footer={null}
            >
                <StyledForm
                    initialValues={{text: textArea}}
                    onFinish={() => {
                        handlePosting(isEdit, isComment, textArea, id, userName, page, likes, dislikes, file)
                    }}

                >
                    <Form.Item name="text" rules={[{required: true, message: 'Text is required'}]}>
                        <StyledTextArea rows={4} onChange={handleChangeText} value={textArea}/>
                    </Form.Item>
                    <Form.Item>

                        {!isComment && renderUploadImg()}

                        <StyledButton htmlType="submit" type="primary">
                            {renderButtonText(isEdit, isComment)}
                        </StyledButton>
                    </Form.Item>
                </StyledForm>

            </Modal>
        </Wrapper>

    )
}

const Wrapper = styled.div`

`
const StyledButton = styled(Button)`
  margin-top: 30px;
`
const StyledTextArea = styled(Input.TextArea)`
  margin: 10px 0;
`

const StyledForm= styled(Form)`
  .anticon-eye{
    display: none!important;
  }
`

export default ModalWindow