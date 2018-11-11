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
