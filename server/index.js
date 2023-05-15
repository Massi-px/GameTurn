import express from 'express'
import getConnection from './database.js'
import { createProxyMiddleware } from 'http-proxy-middleware';
import generateRoute from './routes/routes.js'
import passport from 'passport';
const app = express();
app.use(express.json());
app.use(passport.initialize());
getConnection()

/*Création du proxy*/
app.use("/", createProxyMiddleware( (pathname, req)=>{
        return !pathname.startsWith('/api')
    },
    {target : 'http://127.0.0.1:3000'}
));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*Redirection route*/
generateRoute(app)