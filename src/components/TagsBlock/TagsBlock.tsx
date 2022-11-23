import './TagsBlock.scss';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { togleAction } from '../../redux/todosSlice';

type TTagsBlockProps = {
  tagsList: string[];
  // setToggle: (data: boolean) => void;
  filterTodo: (item: string) => void;
  deleteTag: (item: string) => void;
};

const TagsBlock: React.FC<TTagsBlockProps> = ({ tagsList, filterTodo, deleteTag }) => {
  const dispatch = useDispatch();
  const helper = () => {
    dispatch(togleAction());
  };
  return (
    <div className="tagsBlock">
      <ul>
        <li onClick={() => helper()}>Все задачи</li>
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
