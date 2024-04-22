const debounce = (fn: Function, delay: number) => {
  let timeoutId: number;
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce };
