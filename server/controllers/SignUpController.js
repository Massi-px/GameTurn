import { checkUsernameExists, createUser } from '../models/SignUpModels.js';
export default async function SignUpController(req, res) {
    const { username, surname, firstname, email, password } = req.body;

    // Vérifier si le nom d'utilisateur est déjà utilisé
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
        console.log('Utilisateur déjà existant')
        return res.status(400).json({ error: 'Le nom d\'utilisateur est déjà utilisé' });

    }

    // Créer l'utilisateur
    try {
        const user = await createUser(username, surname, firstname, email, password);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
}
