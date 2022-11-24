import './TagsBlock.scss';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTagsAction, filterTodoAction, togleAction } from '../../redux/todosSlice';
import { RootState } from '../../redux/store';

const TagsBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { tagsState } = useSelector((state: RootState) => state.todosSlice);
  const helper = () => {
    dispatch(togleAction());
  };
  return (
    <div className="tagsBlock">
      <ul>
        <li onClick={() => helper()}>Все задачи</li>
        {tagsState.map((item, index) => (
          <div key={index}>
            <li onClick={() => dispatch(filterTodoAction(item))}>{item}</li>
            <RiCloseCircleLine
              onClick={() => dispatch(deleteTagsAction(item))}
              className="delete-icon"
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
