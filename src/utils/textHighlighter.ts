const textHighlighter = (value: string, matchValue: string) => {
  const regExp = new RegExp(matchValue, "gi");
  return value.replace(regExp, (match) => `<mark>${match}</mark>`);
};

export { textHighlighter };
