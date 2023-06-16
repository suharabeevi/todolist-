import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

  function App() {
    //todo tasks (todo) state
    const [toDo, settoDo] = useState([
     
    ]);
  
  
    //todo Temp state
    const [newTask, setNewTask] = useState("");
    const [updateData, setupdateData] = useState("");
  
    //todo Add task
  
    const addTask = () => {
      if(newTask){
        let num = toDo.length + 1;
        let newEntry = {
          id: num, title: newTask , status : false
        }
        settoDo([...toDo, newEntry])
        setNewTask('')
      }
    };
  
    //todo Delete task
    const deleteTask = (id) => {
      let newTask = toDo.filter( task => task.id !== id)
      settoDo(newTask)
  
    };
  
    //todo Mark task as done or completed
    const markDone = (id) => {
      let newTask = toDo.map(task => {
        if ( task.id === id){
          return({...task, status: !task.status})
        }
        return task;
      })
      settoDo(newTask)
    };
  
    //todo cancel update
    const cancelUpdate = () => {
      setupdateData('')
    };
  
    //todo task editing
  
    const changeTask = (e) =>{
      let newEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false 
      }
      setupdateData(newEntry)
    }
  
  
    //todo task update
  
    const updateTask = () =>{
      let filteredData = [...toDo].filter(task => task.id !== updateData.id)
      let updatedObj = [...filteredData, updateData]
      settoDo(updatedObj)
      setupdateData('');
    }
  
  
  
    return (
      <div className="container App col-lg-5">
        <br />
        <br />
        <h2>To Do List App</h2>
        <br />
        <br />
       
  
        {/*update Task */}
        {updateData && updateData ? (
          <>
         
            <div className="row mb-3">
            <div className="col">
              <input value={updateData && updateData.title} 
              onChange={(e)=> changeTask(e)} className="form-control form-control-lg" />
            </div>
            <div className="col-auto">
              <button onClick={updateTask} className="btn btn-lg btn-success mr-20">Update</button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">Cancel</button>
            </div>
           
          </div>
          </>
        ) : (
          <>
           {/*Add Task */}
        <div className="row mb-3">
          <div className="col">
            <input
             value={newTask} 
             onChange={(e)=> setNewTask(e.target.value)}
             className="form-control form-control-lg" />
          </div>
          <div className="col-auto">
            <button 
             onClick={addTask} 
            className="btn btn-lg btn-success">Add Task</button>
          </div>
        </div>
  
          </>
        )}
      
  
        {/*Display todos */}
  
        {toDo && toDo.length ? "" : "No Tasks..."}
  
        {toDo &&
          toDo
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              return (
                <React.Fragment key={task.id}>
                  <div className="col taskBg">
                    <div className={task.status ? "done" : ""}>
                      <span className="taskNumber">{index + 1}</span>
                      <span className="taskText">{task.title}</span>
                    </div>
  
                    <div className="iconsWrap">
                      <span title="Completed / Not completed"
                       onClick={()=> markDone(task.id)}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </span>
  
                    {task.status ? null : (
                      <span onClick={() => setupdateData({
                        id : task.id,
                        title : task.title,
                        status : task.status ? true : false
                      })} title="Edit">
                      <FontAwesomeIcon icon={faPen} />
                    </span>
  
                    )}
                      <span title="Delete"
                      onClick={()=> deleteTask(task.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
      </div>
    );
  }

export default App;