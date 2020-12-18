function myBind(func, contextObj) {
  return function(...args) {
    func.apply(contextObj, args);
  };
}

