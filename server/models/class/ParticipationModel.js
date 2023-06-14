import AbstractModel from "./AbstractModel.js";


export default class ParticipationModel extends AbstractModel {
    constructor() {
        super('participation');
    }
    async getUserIdsByTournament(id) {
        const participants = await this.getBy({ tournament_id: id });
        return participants.map(participant => participant.player_id);
    }
}