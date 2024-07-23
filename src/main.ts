/*

function onceAndAfter<T extends (...args: any[]) => any>(
  f: T,
  g: T
): (...args: Parameters<T>) => ReturnType<T> {
  let done = false;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!done) {
      done = true;
      return f(...args);
    } else {
      return g(...args);
    }
  }) as T;
}

We can rewrite this if we remember that functions are first-order objects. 
Instead of using a flag to remember which function to call, we can use a toCall 
variable to directly store whichever function needs to be called. 
Logically, that variable will be initialized to the first function but will then change 
to the second one. The following code implements that change:

*/

function onceAndAfter2<T extends (...args: any[]) => any>(
  f: T,
  g: T
): (...args: Parameters<T>) => ReturnType<T> {
  let toCall = f;
  return ((...args: Parameters<T>): ReturnType<T> => {
    let result = toCall(...args);
    toCall = g;
    return result;
  }) as T;
}

const squeak = (x: string) => console.log(x, 'squeak!!');
const creak = (x: string) => console.log(x, 'creak!!');
const makeSound = onceAndAfter2(squeak, creak);
makeSound('door'); // "door squeak!!"
makeSound('door'); // "door creak!!"
makeSound('door'); // "door creak!!"
makeSound('door'); // "door creak!!"

/*
  Working in a functional way, we can write an HOF that will take any predicate, evaluate it, 
  and then negate its result. A possible implementation would be pretty straightforward,

  const not = (fn) => (...args) => !fn(...args);
*/

const not =
  (fn) =>
  (...args) =>
    !fn(...args);

/*
  Let’s opt for the second option and write an invert() function that will change the comparison result.

  const invert = (fn) => (...args) => -fn(...args);
*/    

const invert = (fn) => (...args) => -fn(...args);
