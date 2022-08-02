global.test = 15;

// console.log('global.test :>> ', global.test);
// console.log('__filename :>> ', __filename);
// console.log('__dirname :>> ', __dirname);

// const validator = require("validator")
// import validator from 'validator';
// const fn = require("./test")

// console.log(validator.isEmail("654654@mail.com"));
// console.log('fn() :>> ', fn());

// import asyncFs from 'fs/promises';
// import {dirname} from 'path';
// import { fileURLToPath } from 'url';
// const asyncFs = require("fs/promises")

// const __dirname = dirname(fileURLToPath(import.meta.url))

// asyncFs.readdir(__dirname)
// .then(files => {
//     return Promise.all(
//         files.map(async filename => {
//             const stats = await asyncFs.stat(filename)
//             return {
//                 Name: filename,
//                 Size: stats.size,
//                 Date: stats.mtime
//             }
//         })
//     )
// })
// .then(data => console.table(data))
// =====================================
import readline from "readline";
import asyncFs from "fs/promises";
import { program } from "commander";
import "colors";

// console.log('process.argv :>> ', process.argv);
program.option(
  "-f, --file [type]",
  "filr for savinggame results",
  "results.txt"
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Input number!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Number must be from 1 to 10!");
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await asyncFs.appendFile(logFile, `${data}\n`);
    console.log(`Successed to save result to ${logFile}`.green);
  } catch (err) {
    console.log(`Not successed to save result to ${logFile}`.green);
  }
};

const game = () => {
  rl.question("Input number from 1 to 10".bgGreen.white, (value) => {
    let a = +value;
    if (!isValid(a)) {
      game();
      return;
    }
    count += 1;
    if (a === mind) {
      console.log("Congrats you are find num for %d step(s)", count);
      log(
        `${new Date().toLocaleDateString()}: Congrats you are find num for ${count} step(s)`
      ).finally(() => rl.close());
    }
  });
};

game();
