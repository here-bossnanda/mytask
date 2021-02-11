import axios from "axios";
const baseUrl = 'http://localhost:4000/tasks'

export const startFetchTask = () => {
  return {
    type: 'START_FETCH_TASK'
  }
}

export const fetchAllTask = (tasks) => {
  return {
    type: 'FETCH_ALL_TASK',
    payload: tasks
  }
}

export const fetchOneTask = (task) => {
  return {
    type: 'FETCH_ONE_TASK',
    payload: task
  }
}

export const getAllTask = () => {
  return async (dispatch) => {
    try {
      dispatch(startFetchTask())
      const { data } = await axios.get(baseUrl);
      dispatch(fetchAllTask(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const getTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startFetchTask())
      const { data } = await axios.get(`${baseUrl}/${id}`);
      dispatch(fetchOneTask(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const storeTask = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(startFetchTask())
      await axios.post(baseUrl, payload);
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateTask = (id,payload) => {
  return async (dispatch) => {
    try {
      dispatch(startFetchTask())
      await axios.put(`${baseUrl}/${id}`, payload);
    } catch (error) {
      console.log(error);
    }
  }
}

export const destroyTask = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startFetchTask())
      await axios.delete(`${baseUrl}/${id}`);
      const { tasks } = getState();
      const filterTask = tasks.tasks.filter(el => el.id !== id);
      dispatch(fetchAllTask(filterTask))
    } catch (error) {
      console.log(error);
    }
  }
}