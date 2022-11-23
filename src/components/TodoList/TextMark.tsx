import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type TMarkProps = {
  value: string;
  selectTag: string;
};

const TextMark: React.FC<TMarkProps> = ({ value, selectTag }) => {
  const { selectTagState } = useSelector((state: RootState) => state.todosSlice);
  const markFunc = (str: string) => {
    const tagMark = str.replaceAll(selectTag, `<mark>${selectTagState}</mark>`);
    return { __html: tagMark };
  };
  return <div dangerouslySetInnerHTML={markFunc(value)} />;
};

export default TextMark;
