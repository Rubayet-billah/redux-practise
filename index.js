// async actions
// API: https://jsonplaceholder.typicode.com/todos
// middleware: redux-thunk
// axios

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require('redux-thunk').default;


// constants
const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
const GET_TODOS_FAILED = 'GET_TODOS_FAILED';
const API_URL = 'https://jsonplaceholder.typicode.com/todo'

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

// reducers
const todosReducers = (state = initialTodosState, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.payload
            }
        case GET_TODOS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

// asynchronus action creator
const fetchData = () => {
    return (dispatch) => {
        dispatch(getTodosRequest());
        axios.get(API_URL)
            .then(res => {
                const todos = res.data;
                const titles = todos.map(todo => todo.title)
                dispatch(getTodosSuccess(titles))
            })
            .catch(error => {
                const errorMessage = error.message;
                getTodosFailure(errorMessage)
            })
    }
}


// store
const store = createStore(todosReducers, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchData())
