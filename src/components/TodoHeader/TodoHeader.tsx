import './TodoHeader.scss';

const TodoHeader: React.FC = () => (
  <div className="todoBlockTitle">
    <h1>Добавьте новую задачу</h1>
    <p>в задачу можно добавить тэги</p>
    <p>
      пример: "загрузить <mark>#фото</mark> в альбом"
    </p>
  </div>
);

export default TodoHeader;
