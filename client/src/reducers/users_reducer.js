export default function UserReducer(state={}, action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, login:action.payload}
        case 'USER_AUTH':
            return {...state, login:action.payload}
        case 'GET_USER_POSTS':
            return {...state, userPosts:action.payload}
        case 'GET_ALL_USERS':
            return {...state, users:action.payload}
        case 'USER_REGISTER':
            return {
                ...state,
                registerationStatus:action.payload.registerationStatus,
                users:action.payload.users,
            }
        default:
            return state;
    }
}