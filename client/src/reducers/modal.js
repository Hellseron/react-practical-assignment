const initialState = {

    isEdit: false, // if false, then its modal for adding new post/comment
    isComment: false, // if false, then its modal for Post
    data: {
        title: "",
        imageSrc: null,
        id: null,
        likes: [],
        dislikes: []
    }


}

const modal = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MODAL_TYPE":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default modal
