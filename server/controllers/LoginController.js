import jwt from 'jsonwebtoken';
import LoginModels from '../models/LoginModels.js';

const SECRET_KEY = 'b5229094eae24fbfb8f70d6a82f640a35a6607600674526129bc55dbf036c70c50551b25c688c3dc495bf5d649ce0f2a0323ed61315308bf2b9fe3c3ff8b2f22'
const EXPIRATION_TIME = '1h'; // Durée de validité du token
export default async function LoginController(req, res) {
    const { username, password } = req.body;
    const user = await LoginModels(username, password);
    if (user) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: EXPIRATION_TIME }); // Génération du token en utilisant l'ID de l'utilisateur
        console.log(req.cookies)
        res.cookie('Authentication', token, {
            //expire: 3600 + Date.now(),
            SameSite: 'none',
            secure: true
        })
        console.log(req.get('Origin'))
        console.log(user)
        res.send({ user });
    } else {
        res.status(401)
        res.send({status: "error", message: 'Wrong username or password.'});
    }
};