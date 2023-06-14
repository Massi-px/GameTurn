import express from 'express'
import getConnection from './database.js'
import generateRoute from './routes/routes.js'
import userModel from './models/class/UserModel.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
getConnection()

app.use('/api', cors({

    origin(origin, callback) {
        callback(null, true)
    },
    credentials: true
}))


app.use('/api', async (req, res, next) => {

    if (req.path === '/login' || req.path === '/signup'){
        next()
        return
    }

    const token = req.cookies?.Authentication

    if(token){
        const UserModel = new userModel();
        const users = await UserModel.getBy({token})
        req.user = users[0]
        if (req.user && req.user.isActive) {
            next();
            return;
        }
    }
    // si pas user ou pas token
    res.status(401).json('Vous devez être connecté !')
});

/*Création du proxy*/
/*app.use("/", createProxyMiddleware( (pathname, req)=>{
        return !pathname.startsWith('/api')
    },
    {target : 'http://localhost:5173'}
));*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*Redirection route*/
generateRoute(app)