import JoinTournamentModel from '../models/JoinTournamentModel.js';
import * as TournamentModel from "../models/SelectTournamentModel.js";

export async function joinTournamentController(req, res) {
    const { tournamentId, userId } = req.body;

    try {
        const result = await JoinTournamentModel(tournamentId, userId);

        // Vérifier si le tournoi est complet
        if (result.success) {
            const tournament = await TournamentModel.getTournamentById(tournamentId);
            if (tournament.nmbrParticipants >= tournament.maxNmbrParticipants) {
                res.json({ error: 'Tournament is already full' });
                return;
            }
        }

        res.json(result);
    } catch (error) {
        console.error('Error joining the tournament:', error);
        res.status(500).json({ error: 'An error occurred while joining the tournament' });
    }
}
