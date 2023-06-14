import getConnection from '../database.js';

export default async function ListTournamentModel() {
    const conn = await getConnection();
    const currentDate = new Date().toISOString().slice(0, 10); // Obtenez la date actuelle au format 'YYYY-MM-DD'

    try {
        // Exécutez la requête SQL pour récupérer les tournois dont la date de fin est supérieure ou égale à la date actuelle
        // Traitez les résultats ici (par exemple, renvoyez-les ou effectuez d'autres opérations)

        return await conn.query(
            'SELECT * FROM tournament WHERE end_date >= ?',
            [currentDate]
        ); // Renvoyez les tournois trouvés
    } catch (error) {
        // Gérez les erreurs ici
        console.error('Erreur lors de la récupération des tournois :', error);
        throw error;
    }
}
