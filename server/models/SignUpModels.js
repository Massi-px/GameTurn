import bcrypt from 'bcryptjs';
import getConnection  from '../database.js';

const conn = await getConnection();

export async function checkUsernameExists(username) {

    const result = await conn.query(`SELECT username FROM users WHERE username = '${username}'`);
    return result.length > 0;
}

export async function createUser(username, lastname, firstname, email, password) {

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await conn.query(
        `INSERT INTO users (username, lastname, firstname, email, password)
     VALUES ('${username}', '${lastname}', '${firstname}', '${email}', '${hashedPassword}')`
    );

    const userId = result.affectedRows > 0 ? result.insertId : null;

    return userId
        ? {
            id: userId,
            username,
            lastname,
            firstname,
            email,
            // d'autres informations de l'utilisateur que vous souhaitez renvoyer
        }
        : null;
}