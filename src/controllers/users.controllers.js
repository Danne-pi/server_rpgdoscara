import { createUser } from "../repository/users.repository.js";
import { hashPass } from "../database/salted.js";

export async function create(req, res){
    let user = req.body

    {const { code, message, info } = await hashPass(user, res.locals.code)
    if(code){return res.status(code).send(message)}
    else{user = info}}

    {const { code, message } = await createUser(user)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(201)
}