import { format } from "timeago.js";

export const timeago = (savedTimestamp) => {
  return format(savedTimestamp);
};
