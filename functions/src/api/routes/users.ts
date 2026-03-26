import { Router } from "express";
import type { ProfileData } from "../types/index.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// eslint-disable-next-line new-cap
const router = Router();

router.get("/:uid", async (req, res) => {

  const uid = req.params.uid;

  try {
    const user = (await getDoc(doc(req.db, "users", uid))).data()
    if (user) {
      return res.json(user)
    } else {
      return res.status(404).json({ message: user })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

router.post("/", async (req, res) => {

  const newUser: ProfileData | undefined = req.body?.profile_data;
  if (!newUser) return;

  const userRef = doc(req.db, "users", newUser.uid);
  const userExists = (await getDoc(userRef)).exists()
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    await setDoc(userRef, newUser);
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.json({ error: err })
  }
});

router.put("/:uid", async (req, res) => {

  const newLevel = req.body.profileLevel;
  const uid = req.params.uid

  const userRef = doc(req.db, "users", uid);
  const userExists = (await getDoc(userRef)).exists()

  if (!userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    await updateDoc(userRef, {
      level: newLevel
    });
    return res.status(201).json({ message: "User updated successfully" });
  } catch (err) {

    return res.status(404).json({ message: "User not found", err });
  }
});

export default router;
