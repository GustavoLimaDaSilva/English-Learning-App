
import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import app from "./api/index.js";


export const api = onRequest(app);


setGlobalOptions({maxInstances: 10});
