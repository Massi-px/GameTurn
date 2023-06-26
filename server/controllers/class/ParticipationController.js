import AbstractController from "./AbstractController.js";
import ParticipationModel from "../../models/class/ParticipationModel.js";
import TournamentModel from "../../models/class/TournamentModel.js";
import MatchModel from "../../models/class/MatchModel.js";
export default class ParticipationController extends AbstractController {

    constructor() {
        super(ParticipationModel);
    }

    async getUsers(req, res) {

        await this.model.getBy({ tournament_id: req.params.id });
    }

    async join(req, res) {
        const tournamentModel = new TournamentModel();
        const tournamentId = req.params.id;

        const tournament = await tournamentModel.get(tournamentId)

        if(!tournament){
            res.status(401)
            res.send('Tournament Not Found')
            return;
        }

        // vérif date
        const today = new Date();
        if (tournament.start_date > today || tournament.end_date < today) {
            res.status(401).send('Le tournoi est en dehors de la période valide');
            return;
        }

        const usersByTournament =  await this.model.getBy({ tournament_id: tournamentId });

        if(usersByTournament.length >= tournament.maxNmbrParticipants){
            res.status(401)
            res.send('Erreur le tournoi est complet !')
            return;
        }

        if (usersByTournament.find(user => user.id === req.user.id)) {
            res.status(401)
            res.send(`Erreur l'utilisateur est déjà inscrit au tournois !`)
            return;
        }

        await this.model.insert({
            tournament_id: tournamentId,
            player_id: req.user.id
        });

        const matchModel = new MatchModel();
        const matchs = await matchModel.getBy({tournament_id: tournamentId})
        const matchAvailable = matchs.find(match => match.stage === 0 && match.player2_id === null)
        if (matchAvailable){
            await matchModel.update(matchAvailable.id, { player2_id: req.user.id })
        } else {
            await matchModel.insert({
              tournament_id: tournamentId,
              player1_id: req.user.id,
              stage: 0
            })
        }

        res.status(200)
        console.log('Signup Participant Success !')
        res.send('Utilisateur inscrit créé avec succès !')
    }
}