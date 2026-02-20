import type { DeckType, LessonType } from "../../shared-types/API.js";
import { lessons, users } from "./api/fileReader.js";
import type { ServerUser } from "./api/types/index.js";
const fs = await import("fs/promises");
const crypto = await import("crypto");


function createHexId() {
  return [...crypto.getRandomValues(new Uint8Array(20))]
    .map((m) => ("0" + m.toString(16))
      .slice(-2))
    .join("");
}


export async function writePersonalDeck(deck: Omit<DeckType, "id">, uid: string) {
  const userIndex: number = users.findIndex((u: ServerUser) => u.uid === uid);
  const user = users[userIndex];

  if (user) {
    const newDeck = { ...deck, id: createHexId() } satisfies DeckType;

    user.flashcard_decks ?
      user.flashcard_decks.push(newDeck) :
      user.flashcard_decks = [newDeck];
    users.splice(userIndex, 1, user);
  }

  if (!user?.flashcard_decks) return false;
  try {
    await fs.writeFile("D:/dev/English-Learning-App/server/data/users.json",
      JSON.stringify(users));
  } catch (err) {
    console.error("happened at writePersonalDeck: ", err);
    throw err;
  }
  return true;
}

export async function updateDeck(updatedDeck: DeckType, id: string) {

    const userIndex: number = users.findIndex((u: ServerUser) => u.uid === id);

    if(userIndex) {
    const user = users[userIndex];
    const oldDeckIndex = user.flashcard_decks?.findIndex(deck => updatedDeck.id === deck.id)

    if (oldDeckIndex && user.flashcard_decks) {
      user.flashcard_decks.splice(oldDeckIndex, 1, updatedDeck)
      users.splice(userIndex, 1, user)

      try {
        await fs.writeFile("D:/dev/English-Learning-App/functions/data/users.json",
          JSON.stringify(users));
        return
      } catch (err) {
        console.error("happened at writePersonalDeck: ", err);
        throw err;
      }
    }
  }

  const lessonIndex: number = lessons.findIndex((l: LessonType) => l.id === id);
    const lesson = lessons[lessonIndex];
    const oldLessonDeckIndex = lesson.flashcard_decks?.findIndex((deck: DeckType) => updatedDeck.id === deck.id)

    if (oldLessonDeckIndex) {
      lesson.flashcard_decks.splice(oldLessonDeckIndex, 1, updatedDeck)
      lessons.splice(lessonIndex, 1, lesson)

      try {
        await fs.writeFile("D:/dev/English-Learning-App/functions/data/lessons.json",
          JSON.stringify(users));
        return
      } catch (err) {
        console.error("happened at writePersonalDeck: ", err);
        throw err;
      }
    }
}

