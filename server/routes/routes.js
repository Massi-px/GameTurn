import LoginController from '../controllers/LoginController.js';
import SignUpController from "../controllers/SignUpController.js";


export default function generateRoute(app){
    //app.post('/api/login', LoginController);
    app.post('/api/login', LoginController);
    app.post('/api/signUp', SignUpController);

}