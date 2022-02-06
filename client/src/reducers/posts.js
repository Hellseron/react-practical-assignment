

const initialState = {
    posts: [],
    page: 1
}

const posts = (state = initialState, action) => {
     switch(action.type){
         case "SET_POSTS":
             return{
                 ...state,
                 posts: action.payload
             }
         case "SET_LOADING":
             return {
                 ...state,
                 isLoaded: action.payload
             }

         case "SET_PAGE":
             return {
                 ...state,
                 page: action.payload
             }

         case "SEARCH_POSTS":
             return {
                 ...state,
                 posts: action.payload
             }

         default:
             return state
     }
}

export default posts