import React from 'react';
import './TodoInput.scss';

function TodoInput({ onSubmits, edit }) {
  const [input, setInput] = React.useState(edit ? edit.value : '');

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const filterTag = input.split(' ').filter((item) => item[0] === '#');
    if (!input.length) return;
    onSubmits({
      id: Math.floor(Math.random() * 10000),
      text: input,
      tags: filterTag,
    });

    setInput('');
  };

  return (
    <div className="inputBlock">
      {edit ? (
        <>
          <input
            placeholder="Изменить задачу"
            value={input}
            onChange={handleChange}
            ref={inputRef}
            className="inputBlock__input inputBlock__input__edit"
            // className="todo-input edit"
          />
          <button
            onClick={handleSubmit}
            // className="todo-button edit"
            className="inputBlock__button inputBlock__button__edit"
          >
            Изменить
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Добавить задачу"
            value={input}
            onChange={handleChange}
            className="inputBlock__input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="inputBlock__button">
            Добавить
          </button>
        </>
      )}
    </div>
  );
}

export default TodoInput;
