import React from 'react';
import TagsBlock from '../TagsBlock/TagsBlock';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import './TodoBlock.scss';

function TodoBlock() {
  const [todos, setTodos] = React.useState('');
  const [selectTag, setSelectTag] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [filterTodos, setFilterTodos] = React.useState([]);
  const [toggleFilter, setToggle] = React.useState(false);

  const deleteTag = (item) => {
    const removeTag = tags.filter((tag) => tag !== item);
    const corectTodos = JSON.parse(todos).map((todo) => {
      const text = todo.text.split(' ');
      const res = text.indexOf(item);
      if (res !== -1) {
        const textRes = text.map((item, index) => (index === res ? item.slice(1) : item)).join(' ');

        return {
          id: todo.id,
          text: textRes,
          tags: textRes.split(' ').filter((item) => item[0] === '#'),
        };
      }
      return todo;
    });
    setTodos(JSON.stringify(corectTodos));
    setTags(removeTag);
    setToggle(false);
  };

  const removeDuplicate = (arr) => {
    const arrTags = arr.map((item) => item.tags).flat();
    const arrTagsSet = [...new Set(arrTags)];
    return arrTagsSet;
  };

  const addTodo = (todo) => {
    const result = [...new Set([...tags, ...todo.tags])];
    const data = todos.length !== 0 ? JSON.parse(todos) : [];
    const newTodos = JSON.stringify([todo, ...data]);
    setTodos(newTodos);
    setTags(result);
  };

  const completeTodo = (id) => {
    const updatedTodos = JSON.parse(todos).map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    const updFilterTodos = filterTodos.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });

    setFilterTodos(updFilterTodos);
    setTodos(JSON.stringify(updatedTodos));
  };

  const updateTodo = (todoId, newValue) => {
    const updFilterTodos = filterTodos
      .map((item) => (item.id === todoId ? newValue : item))
      .filter((item) => item.tags.length !== 0);

    const updTodos = JSON.parse(todos).map((item) => (item.id === todoId ? newValue : item));
    setToggle(false);
    setTags(removeDuplicate(updTodos));
    setTodos(JSON.stringify(updTodos));
    setFilterTodos(updFilterTodos);
  };

  const removeTodo = (id) => {
    const removeArr = JSON.parse(todos).filter((todo) => todo.id !== id);
    const removeFilterArr = filterTodos.filter((todo) => todo.id !== id);

    if (!removeFilterArr.length) setToggle(false);

    setFilterTodos(removeFilterArr);
    setTags(removeDuplicate(removeArr));
    setTodos(JSON.stringify(removeArr));
  };

  const filterTodo = (item) => {
    const filterTodos = JSON.parse(todos).filter((todo) => todo.tags.includes(item));
    setSelectTag(item);
    setFilterTodos(filterTodos);
    setToggle(true);
  };

  return (
    <div>
      <h1 className="todoBlockTitle">Добавьте новую задачу</h1>
      <TodoInput onSubmits={addTodo} />
      <TagsBlock
        tagsList={tags}
        filterTodo={filterTodo}
        setToggle={setToggle}
        deleteTag={deleteTag}
      />
      <TodoList
        todos={toggleFilter ? filterTodos : todos.length ? JSON.parse(todos) : []}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        toggleFilter={toggleFilter}
        selectTag={selectTag}
      />
    </div>
  );
}

export default TodoBlock;
