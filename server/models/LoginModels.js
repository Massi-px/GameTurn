import bcrypt from 'bcryptjs';
import getConnection from '../database.js';

export default async function LoginModels(username, password) {
    const conn = await getConnection();
    const result = await conn.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    if (result.length > 0) {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                // d'autres informations de l'utilisateur que vous souhaitez renvoyer
            };
        } else {
            return null;
        }
    } else {
        return null;
    }
}
