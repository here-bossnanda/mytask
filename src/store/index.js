import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
import taskReducers from './reducers/taskReducers'

const rootReducer = combineReducers({
  tasks: taskReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store