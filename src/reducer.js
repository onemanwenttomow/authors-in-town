export default function(state = {}, action) {
    if (action.type == 'GET_USER_INFO') {
        state = {
            ...state,
            user_info: action.user_info
        };
    }

    if (action.type == 'UPDATE_LOCATION') {
        state = {
            ...state,
            location: action.location
        };
    }
    return state;
}
