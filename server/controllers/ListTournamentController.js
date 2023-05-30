import ListTournamentModel from "../models/ListTournamentModel.js";

export default async function ListTournamentController(req, res) {
    try {
        const tournaments = await ListTournamentModel();

        if (tournaments.length > 0) {
            res.send(tournaments);
        } else {
            res.send({ status: "error", message: "No List Tournament" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}
