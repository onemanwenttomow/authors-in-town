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

    if (action.type == 'GET_AUTHORS_EVENTS') {
        state = {
            ...state,
            author_events: action.author_events
        };
    }

    if (action.type == 'GET_AUTHOR_EVENTS_BY_ID') {
        state = {
            ...state,
            author_specific_events: action.author_specific_events
        };
    }

    if (action.type == 'GET_USERS_EVENTS') {
        state = {
            ...state,
            user_events: action.user_events
        };
    }
    if (action.type == 'GET_ALL_EVENTS') {
        state = {
            ...state,
            all_events: action.all_events
        };
    }


    return state;
}
