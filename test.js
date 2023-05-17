const p = new Promise((resolve, reject) => {
  const errVal = Math.random();
  if (errVal < 0.2) {
    reject(new Error("Promise rejected"));
  } else {
    resolve("Resolve");
  }
});

const foo = async () => {
  const isErr = Math.random() < 0.5;

  if (isErr) {
    throw new Error("Is error");
  }

  return p;
};

const fun = async () => {
  try {
    console.log("before foo");
    await foo();
    console.log("after foo");
  } catch (error) {
    console.log("catch foo error");
    console.log(error);
  }
};

fun();
