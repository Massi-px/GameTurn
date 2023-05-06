import getConnection  from '../database.js';

export async function checkUsernameExists(username) {
    const conn = await getConnection();
    const result = await conn.query(`SELECT * FROM users WHERE username = '${username}'`);
    return result.length > 0;
}

export async function createUser(username, surname, firstname, email, password) {
    const conn = await getConnection();
    const result = await conn.query(
        `INSERT INTO users (username, surname, first_name, email, password)
     VALUES ('${username}', '${surname}', '${firstname}', '${email}', '${password}')`
    );
    if (result.affectedRows > 0) {
        return {
            id: result.insertId,
            username,
            surname,
            firstname,
            email,
            // d'autres informations de l'utilisateur que vous souhaitez renvoyer
        };
    } else {
        throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
    }
}
