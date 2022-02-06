import axios from "axios";

const baseURL = "http://localhost:8080/"

export const setPosts = (items) => {
    return {
        type: "SET_POSTS",
        payload: items
    }
}
export const setLoading = (isLoading) => {
    return {
        type: "SET_LOADING",
        payload: isLoading
    }
}
export const addImageToPost = (image) => {
    return {
        type: "ADD_IMAGE",
        payload: image
    }
}

export const setPageNumber = (page) => {
    return {
        type: "SET_PAGE",
        payload: page
    }
}


export const getPosts = (pageNumber) => (dispatch) => {
    dispatch(setLoading(false))
    axios.get(
        `${baseURL}post/page/${pageNumber}`,
    ).then(({data}) => {
        if(data.result.length<1){
            dispatch(setPageNumber(1))
        }
        dispatch(setPosts(data))
    })
        .catch(()=>alert("OOPS! SOMETHING WENT WRONG! TRY AGAIN LATER"))
}

export const createPost = (title, username, page, picture) => (dispatch) => {
    axios.post(`${baseURL}post/`, {
        title: title,
        username: username
    }).catch(()=>alert("OOPS! SOMETHING WENT WRONG! TRY AGAIN LATER."))
        .then(({data}) => {
            if(picture){
                axios.post(`${baseURL}post/${data.result.id}/picture`,  picture  )
                    .then(response =>dispatch(getPosts(page)) )

            } else{
                dispatch(getPosts(page))
            }

        })
        .catch(()=>alert("SORRY SOMETHING WENT WRONG! TRY AGAIN LATER!"))
}

export const deletePost = (id, page) => (dispatch) => {
    axios.delete(`${baseURL}post/${id}`)
        .then(response => {
            if(response.status === 200 || 201){
                dispatch(getPosts(page))
            } else{
                console.log("ERROR!")
            }


        })
}

export const updatePost = (title, id, likes, dislikes,page,picture) => (dispatch) => {
    axios.put(`${baseURL}post/${id}`,{
        title: title,
        likes: likes,
        dislikes: dislikes
    })
        .then(response => {
            if(response.status === 200 || 201){
                if(picture){
                    axios.post(`${baseURL}post/${id}/picture`,  picture  )
                        .then(response => {
                            dispatch(getPosts(page))
                            console.log(response)
                        })

                }else{
                        dispatch(getPosts(page))

                }
            }

        })

}

export const searchPosts = (keyWord, page) => (dispatch) => {
    if(!keyWord){
        dispatch(getPosts(page))
    }else{
        axios.get(`${baseURL}post/search/${keyWord}`)
            .then(({data})=> dispatch(setPosts(data)))
    }

}