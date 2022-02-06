

export const setUsername = (name) => {
    return {
        type: "SET_USERNAME",
        payload: name
    }
}

export const removeUsername = () => {
    return {
        type: "REMOVE_USERNAME"
    }
}

export const loginAuth = (name) => (dispatch) => {
        localStorage.setItem("USERNAME", name)
        dispatch(setUsername(name))
}
export const logOut = () => (dispatch) => {
    localStorage.removeItem("USERNAME")
    dispatch(removeUsername())
}

