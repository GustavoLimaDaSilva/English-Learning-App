import {Router} from "express";
import {users} from "../fileReader.js";
import type {ProfileData} from "../../../../shared-types/API.js";
import {ServerUser} from "../types/index.js";
const fs = await import("fs/promises");

// eslint-disable-next-line new-cap
const router = Router();

router.get("/:uid", (req, res) => {
  if (users.length === 0) {
    res.json([]);
    return;
  }
  const uid = req.params.uid;
  const user = users.find((u: ServerUser) => u.uid === uid);
  user ? res.json(user) : res.json({});
});


router.post("/", async (req, res) => {
  const newUser: ProfileData | undefined = req.body?.profile_data;
  if (!newUser) return;

  if (users.some((u: ServerUser) => u.uid === newUser.uid)) {
    res.status(409).json({message: "User already exists"});
    return;
  }
  users.push(newUser);
  await fs.writeFile("D:/dev/English-Learning-App/server/data/users.json",
    JSON.stringify(users));
  res.status(201).json({message: "User created successfully"});
});


router.put("/:uid", async (req, res) => {
  const newLevel = req.body.profileLevel;
  if (!newLevel) return;

  const uid = req.params.uid;
  const index = users.findIndex((u: ServerUser) => u.uid === uid);

  if (users[index]) {
    users[index].level = newLevel;

    await fs.writeFile(
      "D:/dev/English-Learning-App/server/data/users.json",
      JSON.stringify(users));
    res.status(201).json({message: "User updated successfully"});
  }

  res.status(404).json({message: "User not found"});
});

export default router;
