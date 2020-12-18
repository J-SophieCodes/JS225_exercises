function newStack() {
  let stack = [];

  return {
    push(value) {
      stack.push(value);
    },
    pop() {
      stack.pop();
    },
    printStack() {
      stack.forEach(value => console.log(value));
    },
  };
}