import { format } from "timeago.js";

export const timeago = (savedTimestamp) => format(savedTimestamp + "UTC");
