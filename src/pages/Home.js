import { Navbar } from "../component/Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyTask, getAllTask } from "../store/actions/taskAction";
import { useHistory } from "react-router-dom";


export default function Home(){
  const { tasks, isLoading } = useSelector(state => state.tasks);
  const [getTask, setTask] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(getAllTask())
  }, [])

  useEffect(() => {
    setTask(tasks)
  }, [tasks])

  const deleteTask = (id) => {
    dispatch(destroyTask(id))
  }

  const editTask = (id) => {
    history.push(`edit-task/${id}`)
  }

  const handleFilter = (e) => {
    const { value } = e.target
    const filterByCategory = tasks.filter(task => new RegExp(value, "i").exec(task.category));
    setTask(filterByCategory)
  }

  return (
    <>
    <Navbar />
    <div className="container my-5">
    <h3 className="text-center my-5">LIST TASK</h3>
    <div className="mb-3">
        <label className="form-label">filter by:</label>
        <select className="form-control" onChange={(e) => handleFilter(e)} name="category">
          <option value="">All Category</option>
          <option value="Movie">Movie</option>
          <option value="Shopping">Shopping</option>
          <option value="Workout">Workout</option>
        </select>
      </div>
    <table className="table table-bordered table-light table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">title</th>
          <th scope="col">category</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          (isLoading) ? <h5 className="text-center">Loading...</h5>
          :
          getTask.map((el, idx) => {
            return (
              <tr key={el.id}>
              <th scope="row">{++idx}</th>
              <td>{el.title}</td>
              <td>{el.category}</td>
              <td>
                <button onClick={() => editTask(el.id)} className="btn btn-warning mx-1">EDIT</button>
                <button onClick={() => deleteTask(el.id)} className="btn btn-danger mx-1">DELETE</button>
              </td>
            </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
    </>
  )
}