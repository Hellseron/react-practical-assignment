import axios from "axios";
import {getPosts} from "./posts";

const baseURL = "http://localhost:8080/"



export const createComment = (text, postID, userName, page) => (dispatch) => {
    axios.post(`${baseURL}comment`,{
        text: text,
        postId: postID,
        username: userName
    })
        .then(response=>{
            if(response.status === 200 || 201){
                dispatch(getPosts(page))
            }
        }

        )
}

export const updateComment = (text, id, likes, dislikes,page) => (dispatch) => {
    axios.put(`${baseURL}comment/${id}`,{
        text: text,
        likes: likes,
        dislikes: dislikes
    }).then(response=>{
        if(response.status === 200 || 201){
            dispatch(getPosts(page))
        }

    })

}
export const deleteComment = (id, page) => (dispatch) => {
    axios.delete(`${baseURL}comment/${id}`)
        .then((response)=>{
            if (response.status === 200 || 201){
                dispatch(getPosts(page))
            }
        })
}