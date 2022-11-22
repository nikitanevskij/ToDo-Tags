const TextMark = ({ value, selectTag }) => {
  const markFunc = (str) => {
    const tagMark = str.replaceAll(selectTag, `<mark>${selectTag}</mark>`);
    return { __html: tagMark };
  };
  return <div dangerouslySetInnerHTML={markFunc(value)} />;
};

export default TextMark;
