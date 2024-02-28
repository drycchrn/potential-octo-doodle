function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function (num) {
    return num % 2 === 0
  });
}

/* Write an ES2015 Version */
const filterOutOdds = (...arguments) => arguments.filter((num) => num % 2 === 0)


/*
Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.
*/

const findMin = (...arguments) => Math.min(...arguments)


/*
Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.
*/

const mergeObjects = (firstObject, secondObject) => ({ ...firstObject, ...secondObject })


/* 
Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.
*/

const doubleAndReturnArgs = (array, ...arguments) => ([...array, ...arguments.map((value) => value * 2)])


/** remove a random element in the items array
 * and return a new array without that item. 
 * 
 * function removeRandom(items) {}
*/

const removeRandom = (items) => {
  const numOfItems = items.length;
  let index = Math.floor(Math.random * numOfItems);
  return [...items.slice(0, index), ...items.slice(0, index + 1)];
}


/** Return a new array with every item in array1 and array2. 
 * 
 * function extend(array1, array2) {}
*/

const extend = (array1, array2) => ([...array1, ...array2])


/** Return a new object with all the keys and values
 * from obj and a new key/value pair 
 * 
 * function addKeyVal(obj, key, val) {}
*/

const addKeyVal = (obj, key, val) => {
  let newObj = { ...obj };
  newObj[key] = val;
  return newObj;
}


/** Return a new object with a key removed. 
 * 
 * function removeKey(obj, key) {}
*/

const removeKey = (obj, key) => {
  let newObj = { ...obj };
  delete newObj[key];
  return newObj;
}


/** Combine two objects and return a new object. 
 * 
 * function combine(obj1, obj2) {}
*/

const combine = (obj1, obj2) => ({ ...obj1, ...obj2 })


/** Return a new object with a modified key and value. 
 * 
 * function update(obj, key, val) {}
 * 
 * Note: same as adding a new key and value
*/

const update = (obj, key, val) => {
  let newObj = { ...obj };
  newObj[key] = val;
  return newObj;
}
