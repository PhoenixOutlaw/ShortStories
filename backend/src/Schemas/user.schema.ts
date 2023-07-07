import * as joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const strongPassword = joi
  .extend(joiPasswordExtendCore)
  .string()
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .required()
  .messages({
    "password.minOfUppercase":
      "{#label} should contain at least {#min} uppercase character",
    "password.minOfSpecialCharacters":
      "{#label} should contain at least {#min} special character",
    "password.minOfLowercase":
      "{#label} should contain at least {#min} lowercase character",
    "password.minOfNumeric":
      "{#label} should contain at least {#min} numeric character",
    "password.noWhiteSpaces": "{#label} should not contain white spaces",
  });
  
export const createUserSchema = joi.object({
  name: joi.string().required(),
  userName: joi.string().min(3).max(15).required(),
  profilepic: joi.string().optional(),
  password: strongPassword,
});
export const loginUserSchema = joi.object({
  userName: joi.string().min(3).max(15).required(),
  password: strongPassword,
});

