import LoginController from '../controllers/LoginController.js';


export default function generateRoute(app){
    //app.post('/api/login', LoginController);
    app.post('/api/login', LoginController);
    return LoginController
}