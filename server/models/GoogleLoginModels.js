import getConnection from '../database.js';
import bcrypt from "bcryptjs";

export default async function GoogleLoginModels (googleId, password) {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM users WHERE google_id = ?', [googleId]);

    return result.length > 0 && (await bcrypt.compare(password, result[0].password))
        ? {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            // d'autres informations de l'utilisateur que vous souhaitez renvoyer
        }
        : null;
}
