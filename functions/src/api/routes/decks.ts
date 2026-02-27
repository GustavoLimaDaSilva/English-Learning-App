import {Router} from "express";
import {lessons, users} from "../fileReader.js";
import {updateDeck, writePersonalDeck} from "../../utils.js";
import type {DeckType} from "../../../../shared-types/API.js";
require("firebase-functions/logger/compat")
// eslint-disable-next-line new-cap
const router = Router();

router.get("/:uid", (req, res) => {
  if (!req.query) return;
  const level = req.query.level;
  if (!level) return;

  const uid = req.params.uid;
  type Data = { name: string, id: string }

  const lessonDecksData: Data[] = [];

  for (const l of lessons) {
    lessonDecksData.push({name: l.name, id: l.id});
    if (l.level === Number(level)) break;
  }

  const userDecksData: Data[] = [];
  const user = users.find((u) => u.uid === uid);

  user?.flashcard_decks?.forEach((deck: DeckType) => {
    userDecksData.push({name: deck.name, id: deck.id});
  }) ?? [];

  res.json({
    lessonDecksData: lessonDecksData,
    personalDecksData: userDecksData,
  });
});

router.get("/lessonDecks/:id", (req, res) => {
  const id = req.params.id;
  const deck = lessons.find((l) => l.id === id)?.flashcard_deck;

  if (deck) {
    res.json(deck);
  }
  res.json([]);
});

router.get("/personalDecks/:uid/:deckId", async (req, res) => {
  const uid = req.params.uid;
  const deckId = req.params.deckId;
  const deck = users.find((u) => (u.uid === uid))
    ?.flashcard_decks
    ?.find((d: DeckType) => d.id === deckId);

  if (deck) {
    res.json(deck);
  }
  res.json([]);
});

router.post("/personalDecks/:uid", async (req, res) => {
  const formData = req.body?.formData;
  const uid = req.params.uid;
  if (!formData) return;

  const success = await writePersonalDeck(formData, uid);

  success ?
    res.status(201).json("Deck created successfully") :
    res.status(500).json("Internal Server Error");
  //   res.status(201).json("Deck created successfully");
});

router.put("/updateDeck/:id", (req, res) => {
  const id = req.params.id;
  const updatedDeck: DeckType | undefined = req.body.updatedDeck;
console.log('id: ', id)
console.log('updatedDeck: ', updateDeck)
  if (!updatedDeck) return;

  try {
    updateDeck(updatedDeck, id);
    res.status(204).json({message: "updated successfully"});
  } catch (err) {
    console.error("couldn't update deck: ", err);
  }
});

export default router;
