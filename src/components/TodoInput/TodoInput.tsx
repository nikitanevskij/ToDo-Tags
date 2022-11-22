import React, { ChangeEvent } from 'react';
import { Todo } from '../TodoBlock/TodoBlock';
import './TodoInput.scss';

type TObjEdit = {
  id: number | null;
  value: string;
};
type TInputProps = {
  onSubmits: (todo: Todo) => void;
  edit?: TObjEdit;
};

const TodoInput: React.FC<TInputProps> = ({ onSubmits, edit }) => {
  const [input, setInput] = React.useState(edit ? edit.value : '');

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const filterTag = input.split(' ').filter((item: string) => item[0] === '#');
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
          />
          <button onClick={handleSubmit} className="inputBlock__button inputBlock__button__edit">
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
};

export default TodoInput;
