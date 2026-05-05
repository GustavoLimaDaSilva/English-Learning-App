import { Router } from "express";
import { getDoc, doc, query, collection, getDocs, DocumentData } from "firebase/firestore";

const LESSONS_PLAYLIST_ID = process.env.LESSONS_PLAYLIST_ID
const API_KEY = process.env.API_KEY
import { getPlaylistVideos } from "../../utils.js";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/allVideos", async (req, res) => {

    try {
        const lessonVideos = await getPlaylistVideos(API_KEY, LESSONS_PLAYLIST_ID)
        if (lessonVideos) {
            return res.json({ lessonVideo: lessonVideos })
        }
        return res.json({ error: "couldn't get playlist!" })
    }
    catch (err) {
        return res.json({ error: err })
    }
})


router.get("/", async (req, res) => {

  const lessons: DocumentData[] = []

  try {

    const q = query(collection(req.db, "lessons"))
    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => lessons.push(doc.data()))
    return res.json(lessons)

  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const lesson = (await getDoc(doc(req.db, "lessons", id))).data()
    if (lesson) {
      return res.json(lesson)
    } else {
      return res.status(404).json({ message: "Couldn't find lesson" })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

export default router;
