import AbstractController from "./AbstractController.js";
import ParticipationModel from "../../models/class/ParticipationModel.js";
import TournamentModel from "../../models/class/TournamentModel.js";
export default class ParticipationController extends AbstractController {

    constructor() {
        super(ParticipationModel);
    }

    async getTournamentId(id) {
        const participation = await this.model.get(id);
        if (participation) {
            return participation.tournament_id;
        }
        return null;
    }

    async join(req, res) {
        const tournamentModel = new TournamentModel();

        const tournament = await tournamentModel.get(req.body.tournament_id)

        if(!tournament){
            res.status(401)
            res.send('Tournament Not Found')
            return undefined;
        }

        const usersByTournament = await this.model.getUserIdsByTournament(req.body.tournament_id)

        if(usersByTournament.length >= tournament.maxNmbrParticipants){
            res.status(401)
            res.send('Erreur le tournoi est complet !')
            return undefined;
        }

        await this.model.insert(req.body.tournament_id,req.user.id);

        res.status(200)
        console.log('Signup Participant Success !')
        res.send('Utilisateur inscrit créé avec succès !')

    }

}