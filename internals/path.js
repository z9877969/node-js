const path = require("path");

// console.log(path.relative("/data/new/user/xxx", "/data/new/product/img"));
// console.log(path.resolve("/foo/bar", "../baz"));
console.log(path.normalize("/dom/user/id/.."));
console.log(path.normalize("C:\\\\dom\\\\user\\id\\..\\"));
// console.log(__dirname);