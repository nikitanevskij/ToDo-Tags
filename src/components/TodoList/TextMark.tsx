import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type TMarkProps = {
  value: string;
};

const TextMark: React.FC<TMarkProps> = ({ value }) => {
  const { selectTagState } = useSelector((state: RootState) => state.todosSlice);
  const markFunc = (str: string) => {
    const tagMark = str.replaceAll(selectTagState, `<mark>${selectTagState}</mark>`);
    return { __html: tagMark };
  };
  return <div dangerouslySetInnerHTML={markFunc(value)} />;
};

export default TextMark;
