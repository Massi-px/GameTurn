import AbstractController from "./AbstractController.js";
import TournamentModel from "../../models/class/TournamentModel.js";

export default class TournamentController extends AbstractController {

    constructor() {
        super(TournamentModel);
    }
    _formatReq(obj) {
        const { name, start_date, end_date, maxNmbrParticipants, game } = obj;
        return {name, start_date, end_date, maxNmbrParticipants, game}
    }

}
