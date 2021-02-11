const initialState = {
  tasks: [],
  task: {},
  isLoading: false
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_TASK':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_ALL_TASK':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      }
    case 'FETCH_ONE_TASK':
      return {
        ...state,
        task: action.payload,
        isLoading: false
      }
  
    default:
      return state
  }
}

export default taskReducer