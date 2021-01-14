import axios from 'axios';

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = []
){
    const request = `/api/books?limit=${limit}&skip=${start}&order=${order}`;
    //console.log('request', request);

    const result = axios.get(request)
    .then(response=> {
        if(list){
            return [...list, ...response.data] 
        }else{
            return response.data;
        }
    });
    return {
        type:'GET_BOOKS',
        payload:result
    }
}
export function getBook(bookId){
    //console.log("Get Book Request", `/api/book?id=${bookId}`);
    const response = axios.get(`/api/book?id=${bookId}`).then(response=>response.data);

    return {
        type:'GET_BOOK',
        payload:response
    }
}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/book?id=${id}`);

    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;
            axios.get(`/api/reviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer:data
                };
                //console.log("getBookWithReviewer response", response);
                dispatch({
                    type:'GET_BOOK_WITH_REVIEWER',
                    payload:response
                })
            });
        });
    }
}

export function clearBookWithReviewer(){
    return {
        type:'CLEAR_BOOK_WITH_REVIEWER',
        payload:{
            book:null,
            reviewer:{}
        }
    }
}

export function updateBook(book){
    const request = axios.put('/api/book',book).then(response=> response.data);
    return {
        type:'UPDATE_BOOK',
        payload:request
    }
}

export function deleteBook(bookId){
    const request = axios.delete(`/api/book?id=${bookId}`).then(response=> response.data);
    return {
        type:'DELETE_BOOK',
        payload:request
    }
}

export function clearBook(){
    return {
        type:'CLEAR_BOOK',
        payload:{
            book:null,
            updateBook:false,
            postDeleted:false
        }
    } 
}
/*****USER RELATED!********************************************************* */
export function loginUser({email, password})
{
    const request = axios.post(`/api/user/login`, {email, password})
    .then((response)=> response.data);
    return {
        type:'USER_LOGIN',
        payload:request
    }
}


export function checkAuthentication(){
    //console.log("Inside the checkAuthentication!");
    const request = axios.get(`/api/auth`)
    .then(response=> response.data);
    
    return {
        type:'USER_AUTH',
        payload:request
    }
}


export function addBook(info){
    const request = axios.post('/api/book', info).then((response)=> response.data);
    return {
        type:'ADD_BOOK',
        payload:request
    }
}

export function clearNewBook(){
    return {
        type:'CLEAR_NEW_BOOK',
        payload:{}
    }
}


export function getUserPosts(userId){
    const request = axios.get(`/api/user/posts?user=${userId}`).then(response => response.data);
    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

export function getUsers(){
    const request = axios.get(`/api/users`).then(response => response.data);
    return {
        type:'GET_ALL_USERS',
        payload:request
    }
}

export function registerUser(userInfo, userList/*Contains the existing user List!*/){
   const request = axios.post(`/api/user/register`,userInfo);
    
    return (dispatch)=>{
        request.then(({data})=>
        {
            let userInfo = (data.registeration === true)? [...userList, data.user]:userList;
            let response = {
                registerationStatus:data.registeration,
                users :userInfo
            };

            dispatch({
                type:'USER_REGISTER',
                payload:response
            });
        });
    }
}