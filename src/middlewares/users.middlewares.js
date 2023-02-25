import { userSchema } from "../models/User.js";
import { checkCode, checkUserAlreadyExists } from "../repository/users.repository.js";
import { schemaValidation } from "./generics.js";

export async function userCreateValidation(req, res, next) {
  const user = req.body;

  //checar body
  {const { code, message } = schemaValidation(userSchema, user)
  if(code){return res.status(code).send(message)}}

  //checar disponibilidade do username
  {const { code, message } = await checkUserAlreadyExists(user.username)
  if(code){return res.status(code).send(message)}}

  //checar disponibilidade do codigo
  {const { code, message, info } = await checkCode(user.code)
  if(code){return res.status(code).send(message)}
  res.locals.code = info}

  next()
}