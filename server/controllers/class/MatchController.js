import AbstractController from "./AbstractController.js";
import MatchModel from "../../models/class/MatchModel.js";

 function isValidated(match) {
    // Vérifier si le match est déjà validé
     return match.p1_score_1 !== null
         && match.p1_score_2 !== null
         && match.p2_score_1 !== null
         && match.p2_score_2 !== null
         && match.p1_score_1 === match.p2_score_1
         && match.p1_score_2 === match.p2_score_2
         && match.p1_score_1 !== match.p1_score_2;
}

export default class MatchController extends AbstractController {
    constructor() {
        super(MatchModel);
    }

    /*
    Lorsque on saisit un score
    0 : Est-ce que le match existe ? Est-ce que l'user logué est dedans ? Est-ce que la date de début du tournois est avant aujourd'hui ? Est ce que la date de fin est après aujourd'hui ? Est-ce que le match est déjà validé ? Si oui/non (en fonction) on envoie un message d'erreur => FIN
    1 : Si les scores saisis sont différents de ceux en base, on les enregistre
    (important ! c'est pas la première saisie qui est forcément la bonne !) ;
    on stocke l'id du user ayant saisi ces scores (disons dans match.lastUpdateId)
    et on envoie un message du style "En attente de confirmation" => FIN
    2 : Sinon, si les scores saisis sont les mêmes que ceux en base mais que le lastUpdateId est le même que celui de l'user logué, on renvoie un message du style "En attente de confirmation" => FIN
    3 : Sinon, si (et seulement si) les scores saisis sont les mêmes que ceux en base ET lastUpdateId est différent de celui du user logué, alors on passe lastUpdateId à -1 (une valeur impossible qui permet de savoir que le match est validé, vous pouvez aussi rajouter une valable match.complete) et on continue
    3.bis : Si vous gérez des objets étape, vous trouvez et/ou créer l'étape suivante (étape du match actuel + 1)
    4 : Récupérez le dernier match de l'étape +1
    5 : Si il est inexistant, vous vérifiez que le dernier match de l'étape du match actuel est bien plein, sinon vous le placez à l'étape +1 et y inscrivez l'user loggé en player 2
    6 : Sinon, s'il existe et n'a personne en player2, vous placez l'user logué en player2
    7 : Sinon, vous créez un nouveau match à l'étape +1 et y placez l'user logué en player1
    8 : Sauvegardez tou ça et envoyez un succès

    */

    async updateMatchScores(req, res) {
        const {score1, score2} = req.body;

        // Vérifier si le match existe
        let match = await this.model.get(req.params.id);
        if (!match) {
            res.status(404).send('Le match n\'existe pas');
            return;
        }

        if (isValidated(match)) {
            if (match.p1_score_1 == null || match.p2_score_1 == null) {
                res.send('Enregistrer, en attente de la saisie adverse.');
            } else {
                res.send("Score différent de l'adversaire, mettez vous d'accord");
            }
            return;
        }

        // Vérifier si les scores saisis sont différents de ceux en base
        if (req.user.id === match.player1_id) {
            // Enregistrer les scores saisis et l'ID de l'utilisateur
            match = await this.model.update(req.params.matchId, {
                p1_score_1: score1,
                p1_score_2: score2
            });
            //res.status(200).send('En attente de confirmation');
            // return;
        } else if (req.user.id === match.player2_id) {
            match = await this.model.update(req.params.matchId, {
                p2_score_1: score1,
                p2_score_2: score2
            });
        } else {
            // Vérifier si l'utilisateur est présent dans le match
            res.status(401).send('L\'utilisateur n\'est pas impliqué dans le match');
            return;
        }

        // Vérifier si le match est maintenant validé
        if (!isValidated(match)) {
            // si non BOUM return
            res.json(/*score différents*/);
            return;

        }

        let winnerId;
        if (match.p1_score_1 > match.p1_score_2) {
            winnerId = match.player1_id
        }
        else{
            winnerId = match.player2_id
        }

        // Récupérer le dernier match de l'étape suivante
        const matchs = await this.model.getBy({tournament_id: match.tournament_id})
        const matchAvailable = matchs.find(match => match.stage = match.stage+1 && match.player2_id === null)
        if (matchAvailable){
            await this.model.update(matchAvailable.id, {
                player2_id: winnerId
            })
        } else {
            await this.model.insert({
                event_id:  match.tournament_id,
                player1_id: winnerId,
                stage:  match.stage+1
            })
        }

        res.json({winner: winnerId});
    }
}
