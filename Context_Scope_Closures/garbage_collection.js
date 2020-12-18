function makeCounter() {
  let count = 1;

  return () => {
    console.log(count++);
  };
}

const counter = makeCounter();
counter();
counter();
// more code

/*
the value assigned to the variable count will not be garbage collected after
the function counter is run. The counter function has closed over its parent
scope where the value assigned to count exists. As long as the counter function
exists, it needs to have access to that scope and so JavaScript cannot garbage
collect the value assigned to count.
*/