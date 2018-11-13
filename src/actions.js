import axios from './axios';

export async function getUserInfo() {
    const { data } = await axios.get('/getuserinfo.json');
    return {
        type: 'GET_USER_INFO',
        user_info: data
    };
}

export async function addLocation(location) {
    return {
        type: 'UPDATE_LOCATION',
        location: location
    };
}

export async function getUserEvents() {
    const { data } = await axios.get('/getauthorsevents.json');
    return {
        type: 'GET_AUTHORS_EVENTS',
        author_events: data
    };
}

export async function getAuthorEventById(id) {
    const { data } = await axios.get('/getauthorseventsbyid.json/' + id);
    return {
        type: 'GET_AUTHOR_EVENTS_BY_ID',
        author_specific_events: data
    };
}

export async function getEventsForUser() {
    const { data } = await axios.get('/geteventsbyuserid.json');
    return {
        type: 'GET_USERS_EVENTS',
        user_events: data
    };
}
