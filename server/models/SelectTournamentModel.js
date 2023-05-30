import getConnection from '../database.js';

export async function getTournamentById(tournamentId) {
    const conn = await getConnection();

    try {
        const result = await conn.query(
            'SELECT * FROM tournament WHERE tournament_id = ?',
            [tournamentId]
        );

        // Vérifiez si un tournoi a été trouvé
        if (result.length > 0) {
            return result[0]; // Renvoyez le premier tournoi trouvé
        } else {
            return null; // Renvoyez null si aucun tournoi n'a été trouvé
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du tournoi :', error);
        throw error;
    }
}