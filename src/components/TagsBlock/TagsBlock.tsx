import './TagsBlock.scss';
import { RiCloseCircleLine } from 'react-icons/ri';

type TTagsBlockProps = {
  tagsList: string[];
  setToggle: (data: boolean) => void;
  filterTodo: (item: string) => void;
  deleteTag: (item: string) => void;
};

const TagsBlock: React.FC<TTagsBlockProps> = ({ tagsList, setToggle, filterTodo, deleteTag }) => {
  return (
    <div className="tagsBlock">
      <ul>
        <li onClick={() => setToggle(false)}>Все задачи</li>
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
