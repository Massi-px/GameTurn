import LoginController from '../controllers/LoginController.js';
import SignUpController from "../controllers/SignUpController.js";
import LogoutController from "../controllers/LogoutController.js";
import CreateTournamentController from "../controllers/CreateTournamentController.js";
import ListTournamentController from "../controllers/ListTournamentController.js";
import SelectTournamentController from "../controllers/SelectTournamentController.js";

export default function generateRoute(app){
    //app.post('/api/login', LoginController);
    app.post('/api/login',LoginController);
    app.post('/api/signUp',SignUpController);
    app.post('/api/create-tournament',CreateTournamentController);
    app.get('/api/list-tournament', ListTournamentController);
    app.post('/api/select-tournament', SelectTournamentController);
}