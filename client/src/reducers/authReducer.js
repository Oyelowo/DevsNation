const initialState = {
    isAuthenticated: false,
    user: {}
}
const SET_CURRENT_USER = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ''

        default:
            return state;
    }
}