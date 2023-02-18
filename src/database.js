import { createPool } from "mysql2/promise";
import { database } from "./config.js";

export const pool = createPool(database);