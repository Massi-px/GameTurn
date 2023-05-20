import express from 'express'
import getConnection from './database.js'
import { createProxyMiddleware } from 'http-proxy-middleware';
import generateRoute from './routes/routes.js'
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(passport.initialize());
getConnection()

app.use('/api', (req, res, next) => {
    const origin = req.headers.origin;
    res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, *",
    })
    next();
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