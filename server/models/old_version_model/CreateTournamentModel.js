import getConnection from '../database.js';

export default async function CreateTournamentModel(name, start_date, end_date, maxNmbrParticipants, game) {
    const conn = await getConnection();
    const result = await conn.query(
        `INSERT INTO tournament (name, start_date, end_date, maxNmbrParticipants, game)
    VALUES ('${name}', '${start_date}', '${end_date}', '${maxNmbrParticipants}', '${game}')`
    );
    const tournamentId = result.affectedRows > 0 ? result.insertId : null;

    return tournamentId
        ? {
            id: tournamentId,
            name,
            start_date,
            end_date,
            maxNmbrParticipants,
            game
            // d'autres informations de l'utilisateur que vous souhaitez renvoyer
        }
        : null;
}
