import { connection } from "../database/db.js";
import RepositoryResponse from "./response.js";


export async function createUser(_user){
    const resp = new RepositoryResponse
    const {username, password, name, code_id} = _user

    try {
        await connection.query(`
            WITH deletions AS (DELETE FROM codes WHERE id = $4)
             INSERT INTO users (username, password, name) 
             VALUES ($1, $2, $3)
            `, 
            [username, password, name, code_id])

        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
}


///////////////////////////////////////////////////////


export async function loginUser(_session){
    const resp = new RepositoryResponse
    const {token, user_id, created_at} = _session

    try {
        await connection.query(`
            INSERT INTO sessions (token, user_id, created_at) 
            VALUES ($1, $2, $3)`, 
            [token, user_id, created_at])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}

export async function checkCode(code){
    const resp = new RepositoryResponse
    
    try {
        const query = await connection.query(`
        SELECT id, name FROM codes
        WHERE code = $1`,
        [code])

        resp.condition = query.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "Esse código não existe"
        resp.info = query.rows[0]
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}

export async function checkUserAlreadyExists(username){
    const resp = new RepositoryResponse
    
    try {
        const query = await connection.query(`
        SELECT username FROM users 
        WHERE LOWER(username) = LOWER($1)`,
        [username])

        resp.condition = query.rowCount > 0
        resp.errCode = 409
        resp.errMessage = "Esse username já está em uso"
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}
