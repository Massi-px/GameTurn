import LoginModels from '../models/LoginModels.js';

export default async function LoginController(req, res) {
    const { username, password } = req.body;
    const user = await LoginModels(username, password);
    if (user) {
        res.send({ user });
    } else {
        res.status(401)
        res.send({status: "error", message: 'Wrong username or password.'});
    }
};