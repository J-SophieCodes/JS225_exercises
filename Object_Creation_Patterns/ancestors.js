// name property added to make objects easier to identify
const foo = { name: 'foo' };
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

Object.prototype.ancestors = function ancestors() {
  let chain = [];
  let ancestor = Object.getPrototypeOf(this);

  while (ancestor !== Object.prototype) {
    chain.push(ancestor.name);
    ancestor = Object.getPrototypeOf(ancestor);
  }

  chain.push('Object.prototype');
  return chain;
};

// // [SOLUTION]
// Object.prototype.ancestors = function ancestors() {
//   const ancestor = Object.getPrototypeOf(this);

//   if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
//     return [ancestor.name].concat(ancestor.ancestors());
//   }r

//   return ['Object.prototype'];
// };

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']