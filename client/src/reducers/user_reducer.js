export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,login:action.payload}
        case 'USER_AUTH':
            return {...state,login:action.payload}
        case 'GET_USER_POSTS':
            return {...state,userPosts:action.payload}
        case 'GET_USER':
            return {...state,users:action.payload}
        case 'USER_REGISTER':
            return {
                ...state,
                register:action.payload.success,
                users:action.payload.users
            }
        case 'CLEAR_BOOK':
        return {
            ...state,
            updateBook:action.payload.updateBook,
            book:action.payload.book,
            postDeleted:action.payload.postDeleted
        }
        case 'CLEAR_USERS':

            return {
                ...state,
                user:action.payload.user,
            }
        default:
            return state;
    }
}