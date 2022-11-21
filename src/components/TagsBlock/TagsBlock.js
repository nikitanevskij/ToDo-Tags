import style from './TagsBlock.module.scss';
import { RiCloseCircleLine } from 'react-icons/ri';

const TagsBlock = ({ tagsList, setToggle, filterTodo, deleteTag }) => {
  return (
    <div className={style.tagsBlock}>
      <ul>
        <li onClick={() => setToggle(false)} className={style.active}>
          Все задачи
        </li>
        {tagsList.map((item, index) => (
          <div key={index}>
            <li onClick={() => filterTodo(item)}>{item}</li>
            <RiCloseCircleLine onClick={() => deleteTag(item)} className="delete-icon" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
