import getConnection from '../database.js';


export default async function LoginModels(username, password) {
    const conn = await getConnection();
    const result = await conn.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
    );
    return result[0];
};