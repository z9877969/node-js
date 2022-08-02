import * as fs from "fs/promises";
import { isAccessible } from "./utils/accessible.js";
import program from "./utils/commander.js";
import { handleError } from "./utils/handleerror.js";
import SortFiles from "./module/sort.js";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program.parse(process.argv);
const options = program.opts();

if (!(await isAccessible(options.output))) {
  await fs.mkdir(options.output);
}

try {
  const sorting = new SortFiles(options.output);
  await sorting.readFolder(resolve(__dirname, options.folder));
} catch (e) {
  handleError(e);
}
