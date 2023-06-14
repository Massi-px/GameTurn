export default async function LogoutController(req, res) {
    const cookies = Object.keys(req.cookies);
    cookies.forEach(cookie => {
        res.clearCookie(cookie);
    });

    // Autres actions de déconnexion si nécessaire

    res.send('Déconnexion réussie');
}
