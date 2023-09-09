import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import './style.css'
import {collection, getDocs, updateDoc, addDoc, doc, setDoc} from 'firebase/firestore'
import { query, where, onSnapshot  } from 'firebase/firestore';
import { db, auth } from '../firebase';


export const Home = () => {

    const taskcollectionref = collection(db, 'tasks')
    const usercollectionref = collection(db, 'users')


    const location = useLocation();
    const uid = location.state?.uid;
    const name = location.state?.name;
    const [tasks, setTasks] = useState([]);
    const [tasksdone, setTasksDone] = useState([]);
    const [tasksdoing, setTasksDoing] = useState([]);




    useEffect(() => {
        const fetchTasks = async () => {
          const qToDo = query(taskcollectionref, where('uid_user', '==', uid), where('state', '==', 'to do'));
          const qDoing = query(taskcollectionref, where('uid_user', '==', uid), where('state', '==', 'doing'));
          const qCompleted = query(taskcollectionref, where('uid_user', '==', uid), where('state', '==', 'completed'));
    
          const unsubscribeToDo = onSnapshot(qToDo, (snapshot) => {
            const taskListToDo = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTasks(taskListToDo);
          });
    
          const unsubscribeDoing = onSnapshot(qDoing, (snapshot) => {
            const taskListDoing = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTasksDoing(taskListDoing);
          });
    
          const unsubscribeDone = onSnapshot(qCompleted, (snapshot) => {
            const taskListDone = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTasksDone(taskListDone);
          });
    
          return () => {
            // Unsubscribe the real-time listeners when the component unmounts
            unsubscribeToDo();
            unsubscribeDoing();
            unsubscribeDone();
          };
        };
    
        fetchTasks();
      }, [uid]);
    
    



  const [taskname, setTaskName] = useState("")
  const [taskcontent, setTaskContent] = useState("")

  const handleTask = async (e) => {
    e.preventDefault();

    try{
        const docRef = await addDoc(taskcollectionref, {task_name : taskname, content : taskcontent, uid_user : uid, state : "to do"})
        console.log("Task added");

        setTaskName("")
        setTaskContent("")
    }
    catch(e){
        console.log("Task not added, ERror!");
    }
  }

  const taskchangetodoing = async(e)=>{
    e.preventDefault();
    const taskId = e.target.getAttribute('data-taskid');
    try{
        await updateDoc(doc(db, "tasks", taskId), {
            state: 'doing'
          });
          console.log("Changed the state")
    }
    catch(e){
        console.log("Noit Changed the state")
    }

  }


  const taskchangetocompleted = async(e)=>{
    e.preventDefault();

    const taskId = e.target.getAttribute('data-taskid');
    try{
        await updateDoc(doc(db, "tasks", taskId), {
            state: 'completed'
          });
          console.log("Changed the state")
    }
    catch(e){
        console.log("Noit Changed the state")
    }
  }

  




  return (
    <div className='home'>

        <nav>
            <div className='head-nav'>User </div> {name} <div className='head-nav'>Logged in</div>
        </nav>


        <div className='formwrap'>
            <form onSubmit={handleTask} className='taskform'>

                    <label>Task name </label> <input name="t_name" onChange={(e) => setTaskName(e.target.value)}></input>



                    <label>Task content </label><textarea name="t_content" onChange={(e) => setTaskContent(e.target.value)}></textarea>

            

            <button type='submit' className='task-btn'>Submit</button>

            </form>
      </div>

      <div className='task-container'>

        <div className='box'>
        <div className='task-header'>To Do Tasks</div>

            {tasks.map((taskk) => (
            <div key={taskk.id} className='todo do'>
                
                <h3>{taskk.task_name}</h3>
                <p>{taskk.content}</p>
                <p>{taskk.id}</p>
                <button type="submit" className='task-btn' data-taskid={taskk.id}  onClick={taskchangetodoing}>Doing...</button>
            </div>
            ))}
        </div>
        <div className='box'>
        <div className='task-header'>Doing Tasks</div>
            {tasksdoing.map((taskk) => (
            <div key={taskk.id} className='todo doing'>
                <h3>{taskk.task_name}</h3>
                <p>{taskk.content}</p>
                <button type="submit"  className='task-btn' data-taskid={taskk.id}  onClick={taskchangetocompleted}>Completed</button>
            </div>
            ))}
        </div>
        <div className='box'>
            <div className='task-header'>Completed Tasks</div>
            {tasksdone.map((taskk) => (
            <div key={taskk.id} className='todo done'>
                <h3>{taskk.task_name}</h3>
                <p>{taskk.content}</p>
            </div>
            ))}
        </div>

      </div>

    </div>
  )
}
