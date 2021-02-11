import { FormTask } from "../component/FormTask";
import { Navbar } from "../component/Navbar";

export default function Create(){
  return (
    <>
    <Navbar />
    <div className="container my-5">
    <h3 className="text-center">Edit new task</h3>
    <FormTask />
    </div>
    </>
  )
}