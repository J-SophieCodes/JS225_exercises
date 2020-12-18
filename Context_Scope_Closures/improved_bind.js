function myBind(func, context, ...args1) {
  return function(...args2) {
    return func.apply(context, [...args1, ...args2]);
  };
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10));