import { z } from "zod";

export const createLinkSchema = z.object({
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 character",
    })
    .max(100),
  url: z
    .string({
      message: "URL must be a string",
    })
    .url({
      message: "URL must be a valid URL",
    }),
  description: z
    .string({
      message: "Description must be a string",
    })
    .max(1000)
    .optional(),
});
