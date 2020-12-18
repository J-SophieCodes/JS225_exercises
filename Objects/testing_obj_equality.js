function getUniques(arr1, arr2) {
  return [...new Set(arr1.concat(arr2))];
}

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  let uniques = getUniques(keys1, keys2);
  return uniques.every(key => {
    let item1 = obj1[key];
    let item2 = obj2[key];

    if (allObjects(item1, item2)) {
      return objectsEqual(item1, item2);
    }
    return item1 === item2;
  });
}

function allObjects(...items) {
  return items.every(item => {
    return typeof item === 'object';
  });
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: {b: 'bar'}}, {a: 'foo', b: {a: 'foo', b: 'bar'}}));