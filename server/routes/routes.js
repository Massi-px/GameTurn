import SignUpController from "../controllers/SignUpController.js";
import UserController from "../controllers/class/UserController.js";
import TournamentController from "../controllers/class/TournamentController.js";
import ParticipationController from "../controllers/class/ParticipationController.js";
export default function generateRoute(app){

    const user = new UserController();
    const tournament = new TournamentController();
    const participation = new ParticipationController();

    //app.post('/api/login', LoginController);
    app.post('/api/login', (req, res) => user.login(req, res));
    app.post('/api/signup',SignUpController);

    app.post('/api/tournaments', (req, res) => tournament.post(req, res));
    app.get('/api/tournaments', (req, res) => tournament.getAll(req, res));
    app.get('/api/tournaments/:id', (req, res) => tournament.get(req,res));

    app.post('/api/tournaments/join', (req, res) => participation.join(req,res));
}