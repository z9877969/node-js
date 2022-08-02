import fs from "fs/promises";
import { extname, join } from "path";
import { isAccessible } from "../utils/accessible.js";
import { handleError } from "../utils/handleerror.js";

class SortFiles {
  constructor(dist) {
    this.dist = dist;
  }

  async #copyFile(file) {
    const folder = extname(file.path);
    const targetPath = join(this.dist, folder);
    try {
      if (!(await isAccessible(targetPath))) {
        await fs.mkdir(targetPath);
      }
      await fs.copyFile(file.path, join(targetPath, file.name));
    } catch (e) {
      handleError(e);
    }
  }

  async readFolder(base) {
    const files = await fs.readdir(base);

    for (const file of files) {
      const localBase = join(base, file);
      const stats = await fs.stat(localBase);
      if (stats.isDirectory()) {
        await this.readFolder(localBase);
      } else {
        await this.#copyFile({ name: file, path: localBase });
      }
    }
  }
}

export default SortFiles;
