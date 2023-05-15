import bcrypt from 'bcryptjs';
import getConnection  from '../database.js';

export async function checkUsernameExists(username) {
    const conn = await getConnection();
    const result = await conn.query(`SELECT * FROM users WHERE username = '${username}'`);
    return result.length > 0;
}

export async function createUser(username, lastname, firstname, email, password) {
    const conn = await getConnection();

    // Vérifier si l'utilisateur existe déjà dans la base de données
    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
        throw new Error('Nom d\'utilisateur déjà utilisé');
    }

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