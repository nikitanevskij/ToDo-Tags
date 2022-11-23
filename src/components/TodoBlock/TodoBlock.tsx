import React from 'react';
import './TodoBlock.scss';
import TagsBlock from '../TagsBlock/TagsBlock';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoAction,
  deleteTodoAction,
  completeTodoAction,
  filterTodoAction,
  updateTodoAction,
  deleteTagsAction,
} from '../../redux/todosSlice';
import { RootState } from '../../redux/store';

export type Todo = {
  id: number;
  text: string;
  tags: string[];
  isComplete?: boolean;
};

const TodoBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { todosList, filtredTodosList, tagsState, togleState, selectTagState } = useSelector(
    (state: RootState) => state.todosSlice,
  );

  // const [todos, setTodos] = React.useState('');
  // const [selectTag, setSelectTag] = React.useState('');
  // const [tags, setTags] = React.useState<string[]>([]);
  // const [filterTodos, setFilterTodos] = React.useState<Todo[]>([]);
  // const [toggleFilter, setToggle] = React.useState(false);

  const deleteTag = (item: string) => {
    dispatch(deleteTagsAction(item));

    // const removeTag = tags.filter((tag) => tag !== item);
    // const corectTodos = JSON.parse(todos).map((todo: Todo) => {
    //   const text = todo.text.split(' ');
    //   const res = text.indexOf(item);
    //   if (res !== -1) {
    //     const textRes = text.map((item, index) => (index === res ? item.slice(1) : item)).join(' ');

    //     return {
    //       id: todo.id,
    //       text: textRes,
    //       tags: textRes.split(' ').filter((item) => item[0] === '#'),
    //     };
    //   }
    //   return todo;
    // });
    // setTodos(JSON.stringify(corectTodos));
    // setTags(removeTag);
    // setToggle(false);
  };

  // const removeDuplicate = (arr: Todo[]) => {
  //   const arrTags = arr.map((item) => item.tags).flat();
  //   const arrTagsSet = [...new Set(arrTags)];
  //   return arrTagsSet;
  // };

  const addTodo = (todo: Todo) => {
    dispatch(addTodoAction(todo));

    // const result = [...new Set([...tags, ...todo.tags])];
    // const data = todos.length ? JSON.parse(todos) : [];
    // const newTodos = JSON.stringify([todo, ...data]);
    // setTags(result);
    // setTodos(newTodos);
    // setToggle(false);
  };

  const completeTodo = (id: number) => {
    dispatch(completeTodoAction(id));

    // const updatedTodos = JSON.parse(todos).map((item: Todo) => {
    //   if (item.id === id) {
    //     item.isComplete = !item.isComplete;
    //   }
    //   return item;
    // });
    // const updFilterTodos = filterTodos.map((item) => {
    //   if (item.id === id) {
    //     item.isComplete = !item.isComplete;
    //   }
    //   return item;
    // });

    // setFilterTodos(updFilterTodos);
    // setTodos(JSON.stringify(updatedTodos));
  };

  const updateTodo = (todoId: number | null, newValue: Todo) => {
    dispatch(updateTodoAction({ todoId, newValue }));

    // const updFilterTodos = filterTodos
    //   .map((item) => (item.id === todoId ? newValue : item))
    //   .filter((item) => item.tags.length !== 0);

    // const updTodos = JSON.parse(todos).map((item: Todo) => (item.id === todoId ? newValue : item));
    // setToggle(false);
    // setTags(removeDuplicate(updTodos));
    // setTodos(JSON.stringify(updTodos));
    // setFilterTodos(updFilterTodos);
  };

  const removeTodo = (id: number) => {
    dispatch(deleteTodoAction(id));

    // const removeArr = JSON.parse(todos).filter((todo: Todo) => todo.id !== id);
    // const removeFilterArr = filterTodos.filter((todo: Todo) => todo.id !== id);

    // if (!removeFilterArr.length) setToggle(false);

    // setFilterTodos(removeFilterArr);
    // setTags(removeDuplicate(removeArr));
    // setTodos(JSON.stringify(removeArr));
  };

  const filterTodo = (item: string) => {
    dispatch(filterTodoAction(item));

    // const filterTodos = JSON.parse(todos).filter((todo: Todo) => todo.tags.includes(item));
    // setSelectTag(item);
    // setFilterTodos(filterTodos);
    // setToggle(true);
  };

  return (
    <div>
      <h1 className="todoBlockTitle">Добавьте новую задачу</h1>

      <TodoInput onSubmits={addTodo} />
      <TagsBlock tagsList={tagsState} filterTodo={filterTodo} deleteTag={deleteTag} />
      <TodoList
        todos={togleState ? filtredTodosList : todosList.length ? JSON.parse(todosList) : []}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        toggleFilter={togleState}
        selectTag={selectTagState}
      />
    </div>
  );
};

export default TodoBlock;
