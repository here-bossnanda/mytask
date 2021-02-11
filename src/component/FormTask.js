import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getTask, storeTask, updateTask } from "../store/actions/taskAction";

export const FormTask = () => {
  const [getInputTasks, setInputTasks] = useState({title: '', category: ''})
  const [getValidate, setValidate] = useState('');
  const { task } = useSelector(state => state.tasks)
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getTask(id));
    }
  },[])

  useEffect(() => {
    if (id) {
      setInputTasks({
        title: task.title,
        category: task.category
      })
    }
  },[task])

  const handleTaskChange = (e) => {
    const { value, name } = e.target;
    setInputTasks({
      ...getInputTasks,
      [name]: value
    })
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    const {title, category} = getInputTasks
    if (title && category) {
      if (id) {
        dispatch(updateTask(id,getInputTasks))
      }else{
        dispatch(storeTask(getInputTasks))
      }
      setTimeout(() => {
        history.push('/');
      },300)
    }else {
      let valueValidate = getValidate
      if (!title) {
        valueValidate += "Title can't be empty ";
      } 
      if(!category){
        valueValidate += "category can't be empty ";
      }

      setValidate(valueValidate);
      setTimeout(() => {
        setValidate("")
      },1000)
    }
  }

  return (
    <>
    {(getValidate) && 
    <div className="alert alert-danger" role="alert">
    {getValidate}
    </div>
    }

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label  className="form-label">todos</label>
      <input onChange={(e) => handleTaskChange(e)} value={getInputTasks.title} type="text" name="title" className="form-control" placeholder="Ex: eat something" />
      </div>
      <div className="mb-3">
        <label className="form-label">category</label>
        <select className="form-control" onChange={(e) => handleTaskChange(e)} value={getInputTasks.category} name="category">
          <option value="">Please Select category</option>
          <option value="Movie">Movie</option>
          <option value="Shopping">Shopping</option>
          <option value="Workout">Workout</option>
        </select>
      </div>
    <button type="submit" className="btn btn-success">Save</button>
    </form>
    </>
    )
}