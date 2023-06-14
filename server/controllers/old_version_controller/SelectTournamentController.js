import {getTournamentById} from "../models/SelectTournamentModel.js";

export default async function SelectTournamentController(req, res) {
    const {tournamentId} = req.body;

    try {
        const selectTournament = await getTournamentById(tournamentId);
        res.json(selectTournament);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }

}