import { init } from "@instantdb/react";
import schema from "../instant.schema";

const appId = import.meta.env.VITE_INSTANT_APP_ID;

if (!appId) {
  throw new Error(
    "Missing VITE_INSTANT_APP_ID. Add it to your .env file (see README.md)."
  );
}

const db = init({ appId, schema });

export default db;
