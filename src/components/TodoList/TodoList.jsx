import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import TodoInput from '../TodoInput/TodoInput';
import './TodoList.scss';
import TextMark from './TextMark';

function TodoList({ todos, completeTodo, removeTodo, updateTodo, toggleFilter, selectTag }) {
  const [edit, setEdit] = React.useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoInput edit={edit} onSubmits={submitUpdate} />;
  }
  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
      <div key={todo.id}>
        {toggleFilter ? <TextMark value={todo.text} selectTag={selectTag} /> : todo.text}
      </div>
      <div className="icons">
        <AiOutlineCheckCircle onClick={() => completeTodo(todo.id)} />
        <RiCloseCircleLine onClick={() => removeTodo(todo.id)} />
        <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} />
      </div>
    </div>
  ));
}

export default TodoList;
