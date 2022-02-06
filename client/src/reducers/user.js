const initialState = {
    userName: null,

}


const user = (state = initialState,action) => {
    switch(action.type){
        case "SET_USERNAME":
            return {
                ...state,
                userName: action.payload,
            }
        case "REMOVE_USERNAME":
            return{
                ...state,
                userName: null,
            }

        default: return state


    }
}

export default user