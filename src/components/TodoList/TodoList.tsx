import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import TodoInput from '../TodoInput/TodoInput';
import './TodoList.scss';
import TextMark from './TextMark';
import { Todo } from '../TodoBlock/TodoBlock';
import { completeTodoAction, deleteTodoAction, updateTodoAction } from '../../redux/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type TListProps = {
  todos: Todo[];
};
type TEdit = {
  id: number | null;
  value: string;
};

const TodoList: React.FC<TListProps> = ({ todos }) => {
  const dispatch = useDispatch();
  const { togleState } = useSelector((state: RootState) => state.todosSlice);
  const [edit, setEdit] = React.useState<TEdit>({
    id: null,
    value: '',
  });

  const submitUpdate = (value: Todo) => {
    const todoId = edit.id;
    dispatch(updateTodoAction({ todoId, value }));

    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoInput edit={edit} onSubmits={submitUpdate} />;
  }

  return (
    <>
      {todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          <div key={todo.id}>{togleState ? <TextMark value={todo.text} /> : todo.text}</div>
          <div className="icons">
            <AiOutlineCheckCircle onClick={() => dispatch(completeTodoAction(todo.id))} />
            <RiCloseCircleLine onClick={() => dispatch(deleteTodoAction(todo.id))} />
            <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
