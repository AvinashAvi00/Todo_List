"use client"
import React, { useState, useEffect } from 'react'
import { db } from '../app/firebase'
import { collection, query, orderBy, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

 // Read todo from Firebase
useEffect(() => {
  const q = query(collection(db, 'todos'), orderBy('title'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ id: doc.id, ...doc.data() });
    });
    setMainTask(todosArr);
  });
  return () => unsubscribe();
}, []);


  // Create todo in Firebase
  const submitHandler = async (e) => {
    e.preventDefault();
    const todoRef = collection(db, 'todos');
    await addDoc(todoRef, { title, desc });
    setTitle("");
    setDesc("");
  }

  // Delete todo from Firebase
  const deleteHandler = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  }

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <h6 className='text-xl font-medium'>{t.desc}</h6>
          </div>
          <button 
            onClick={() => {
              deleteHandler(t.id); // Pass todo id to deleteHandler
            }}
            className='bg-red-400 text-white px-4 py2 rounded font-bold'>
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'> Todo List</h1>
      <form onSubmit={submitHandler}>
        <input 
          type='text' 
          className='text-2xl border-zinc-800  border-4 m-8 px-4 py-2' 
          placeholder='Enter Title here'
          value={title}
          onChange={(e)=> {
            setTitle(e.target.value);
          }}
        />
        <input 
          type='text' 
          className='text-2xl border-zinc-800  border-4 m-8 px-4 py-2' 
          placeholder='Enter Description here'
          value={desc}
          onChange={(e)=> {
            setDesc(e.target.value);
          }}
        />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  );
}

export default Page;
