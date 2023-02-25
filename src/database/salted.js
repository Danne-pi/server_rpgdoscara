import bcrypt from 'bcrypt';
import RepositoryResponse from '../repository/response.js';


export async function hashPass(user, code){
    const resp = new RepositoryResponse

    try {
        const hash = bcrypt.hashSync(user.password, 10)
    
        resp.info = {
            username: user.username,
            password: hash,
            name: code.name,
            code_id: code.id
        }
    
        return resp.continue()
        
    } catch (err) {
        return resp.direct(500, err.message)
    }
}

export async function checkHash(pass, hash){
    const resp = new RepositoryResponse

    try {
        const result = bcrypt.compareSync(pass, hash)

        resp.condition = !result
        resp.errCode = 401
        resp.errMessage = "Wrong password/username"
        return resp.byCondition()
        
    } catch (err) {
        return resp.direct(500, err.message)
    }
}
