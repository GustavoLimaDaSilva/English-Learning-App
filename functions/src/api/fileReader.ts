import type {ServerUser} from "./types/index.js";
import type {LessonType} from "../../../shared-types/API.js";

const fs = await import("fs");

async function readFile(name: string) {
  try {
    const parsedFile = await fs.promises
      .readFile(`./data/${name}.json`, "utf-8");
    return parsedFile ? JSON.parse(parsedFile) : [];
  } catch (err) {
    console.error("error at fileReader: ", err);
    return [];
  }
}


const lessons: LessonType[] = await readFile("lessons");
const users: ServerUser[] = await readFile("users");
export {lessons, users};
