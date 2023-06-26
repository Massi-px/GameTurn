import SignUpController from "../controllers/SignUpController.js";
import UserController from "../controllers/class/UserController.js";
import TournamentController from "../controllers/class/TournamentController.js";
import ParticipationController from "../controllers/class/ParticipationController.js";
import MatchController from "../controllers/class/MatchController.js";
export default function generateRoute(app){

    const user = new UserController();
    const tournament = new TournamentController();
    const participation = new ParticipationController();
    const match = new MatchController();

    //app.post('/api/login', LoginController);
    app.post('/api/login', (req, res) => user.login(req, res));
    app.post('/api/signup',SignUpController);

    app.post('/api/tournaments', (req, res) => tournament.post(req, res));
    app.get('/api/tournaments', (req, res) => tournament.getAll(req, res));
    app.get('/api/tournaments/:id', (req, res) => tournament.get(req,res));
    app.get('/api/tournaments/:id/users', (req, res) => participation.getUsers(req,res));
    app.post('/api/tournaments/:id/join', (req, res) => participation.join(req,res));

    app.get('/api/tournaments/listMatch/:id', (req, res) => match.getAll(req, res));
    app.get('/api/tournaments/match', (req, res) => match.get(req, res));

    app.post('/api/match/:id/setScore', (req, res) => match.updateMatchScores(req, res));

}