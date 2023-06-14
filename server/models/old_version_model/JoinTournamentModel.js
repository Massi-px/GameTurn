import getConnection from '../database.js';

const conn = await getConnection();

export async function checkTournamentExists(tournamentId){
    // Vérifier si le tournoi existe
    const tournament = await conn.query(
        'SELECT * FROM tournament WHERE tournament_id = ?',
        [tournamentId]
    );
    return tournament.length > 0;
}

export async function checkMaxNmbrParticipants(tournamentId){
    // Compter le nombre de participants inscrits dans le tournoi
    const participantsCountTournament = await conn.query(
        'SELECT COUNT(*) AS count FROM participation WHERE tournament_id = ?',
        [tournamentId]
    );

    return participantsCountTournament[0].count;
}

export async function JoinTournamentModel(tournamentId, userId, nmbrParticipants) {

    // Ajouter l'entrée de participation dans la table
    await conn.query(
        'INSERT INTO participation (tournament_id, player_id) VALUES (?, ?)',
        [tournamentId, userId]
    );

    // Mettre à jour le nombre de participants dans le tournoi
    await conn.query(
        'UPDATE tournament SET nmbrParticipants = ? WHERE tournament_id = ?',
        [nmbrParticipants + 1, tournamentId]
    );

}
