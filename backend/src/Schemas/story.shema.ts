import * as joi from "joi";

export const createStorySchema = joi.object({
    title: joi.string().min(4).max(15).required(),
    content: joi.string().min(10).max(1000).required(),
  });