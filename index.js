// async actions
// API: https://jsonplaceholder.typicode.com/todos
// middleware: redux-thunk
// axios


// constants
const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
const GET_TODOS_FAILED = 'GET_TODOS_FAILED';

// states
const initialTodosState = {
    todos: [],
    isLoading: false,
    error: null
}

// actions
const getTodosRequest = () => {
    return {
        type: GET_TODOS_REQUEST
    }
}
const getTodosFailure = (error) => {
    return {
        type: GET_TODOS_FAILED,
        payload: error
    }
}
const getTodosSuccess = (todos) => {
    return {
        type: GET_TODOS_REQUEST,
        payload: todos
    }
}
