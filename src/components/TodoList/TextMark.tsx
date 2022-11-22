type TMarkProps = {
  value: string;
  selectTag: string;
};

const TextMark: React.FC<TMarkProps> = ({ value, selectTag }) => {
  const markFunc = (str: string) => {
    const tagMark = str.replaceAll(selectTag, `<mark>${selectTag}</mark>`);
    return { __html: tagMark };
  };
  return <div dangerouslySetInnerHTML={markFunc(value)} />;
};

export default TextMark;
