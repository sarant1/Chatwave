const foo: any[] = [];
const rooms = [
  {
    bar: 1,
    unsubscribe: (string: string) => {
      console.log(string);
    },
  },
  {
    bar: 2,
    unsubscribe: (string: string) => {
      console.log(string);
    },
  },
  {
    bar: 3,
    unsubscribe: (string: string) => {
      console.log(string);
    },
  },
];
rooms.forEach((item) => {
  foo.push(item);
});

console.log(foo.length);
foo.forEach((item) => {
  let func = item.unsubscribe;
  func("Hello World");
});

var arr: any[] = [];
setTimeout(() => {
  arr.push(1, 2, 3);
}, 5000);

console.log("ARR LENGTH: ", arr.length);
console.log(arr);
