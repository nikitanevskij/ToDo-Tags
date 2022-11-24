import React from 'react';
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoInput from '../TodoInput/TodoInput';
import TagsBlock from '../TagsBlock/TagsBlock';
import TodoList from '../TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction } from '../../redux/todosSlice';
import { RootState } from '../../redux/store';

export type Todo = {
  id: number;
  text: string;
  tags: string[];
  isComplete?: boolean;
};

const TodoBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { todosList, filtredTodosList, togleState } = useSelector(
    (state: RootState) => state.todosSlice,
  );

  const addTodo = (todo: Todo) => {
    dispatch(addTodoAction(todo));
  };

  return (
    <div>
      <TodoHeader />
      <TodoInput onSubmits={addTodo} />
      <TagsBlock />
      <TodoList
        todos={togleState ? filtredTodosList : todosList.length ? JSON.parse(todosList) : []}
      />
    </div>
  );
};

export default TodoBlock;
