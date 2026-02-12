/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";

import functions from 'firebase-functions/v1';

// const { lessons, users } = (await import('./fileReader.js'))
const express = (await import('express')).default
const cors = (await import('cors')).default
const usersRoute = (await import('./routes/users.js')).default
const lessonsRoute = (await import('./routes/lessons.js')).default
const decksRoute = (await import('./routes/decks.js')).default
const imageAuthRoute = (await import('./routes/imageKitAuth.js')).default
const app = express()

app.use(express.json())
const port = 3000

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use('/users', usersRoute)
app.use('/lessons', lessonsRoute)
app.use('/decks', decksRoute)
app.use('/auth', imageAuthRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})

exports.app = functions.https.onRequest(app)

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
