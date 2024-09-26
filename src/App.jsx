import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("Todos");
    return savedTodos ? JSON.parse(savedTodos) : []; 
  });
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos]); 

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo(""); 
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter(i => i.id === id);
    setTodo(t[0].Todo);
    let newtodos = Todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newtodos);
    saveToLS();
  };


  const handleDelete = (id) => {
    let ask = confirm("Are you sure you want to delete it?");
    if (ask) {
      let newtodos = Todos.filter(item => item.id !== id);
      setTodos(newtodos);
    }
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newtodos = [...Todos];
    let index = Todos.findIndex(item => item.id === id);
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
  };

  let todolist = "text-xl font-bold";

  return (
    <div>
      <Navbar />
      <div className="md:containerm mx-3 md:mx-auto bg-violet-100 my-5 md:w-[35%] rounded-xl p-5 min-h-[80vh]">
      <h1 className='font-bold text-center text-xl'>iTask-Manage Your Todos at one Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <div className='flex'>
          <input onChange={handleChange} value={Todo} type="text" className='w-full px-5 py-2 rounded-sm' />
          <button onClick={handleAdd} disabled={Todo.length<3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-300 text-white py-1 text-sm font-bold rounded-md mx-2 p-4'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished}/> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[80%] mx-auto my-5'></div>
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div>No Todos to display</div>}
          {Todos.map(item => {
            return (showFinished || (!item.isCompleted)) && (
              <div key={item.id} className="todo flex justify-between my-3 p-5 rounded-lg hover:bg-violet-200 duration-200">
                <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                  <div className={item.isCompleted ? `line-through ${todolist}` : `${todolist}`}>{item.Todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id); }} className='bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 mx-1 text-sm font-bold rounded-md'><FaRegEdit className='size-5'/></button>
                  <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 mx-1 text-sm font-bold rounded-md'><MdDelete className='size-5' /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
