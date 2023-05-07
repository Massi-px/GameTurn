import bcrypt from 'bcryptjs';
import getConnection  from '../database.js';

export async function checkUsernameExists(username) {
    const conn = await getConnection();
    const result = await conn.query(`SELECT * FROM users WHERE username = '${username}'`);
    return result.length > 0;
}

export async function createUser(username, lastname, firstname, email, password) {
    const conn = await getConnection();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await conn.query(
        `INSERT INTO users (username, lastname, firstname, email, password)
     VALUES ('${username}', '${lastname}', '${firstname}', '${email}', '${hashedPassword}')`
    );
    if (result.affectedRows > 0) {

        return {
            id: userId,
            username,
            lastname,
            firstname,
            email,
            // d'autres informations de l'utilisateur que vous souhaitez renvoyer
        };
    } else {
        throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
    }
}