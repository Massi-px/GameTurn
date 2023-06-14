import AbstractController from "./AbstractController.js";
import UserModel from "../../models/class/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = 'b5229094eae24fbfb8f70d6a82f640a35a6607600674526129bc55dbf036c70c50551b25c688c3dc495bf5d649ce0f2a0323ed61315308bf2b9fe3c3ff8b2f22';
const EXPIRATION_TIME = '1y'; // Durée de validité du token

export default class UserController extends AbstractController{
    constructor(){
        super(UserModel);
    }
    _formatRes(user){
        delete user.password
        delete user.token
        return user;
    }

    _formatReq(obj) {
        const clean =
            {
                'username': obj.username || "",
                'lastname': obj.lastname || "",
                'firstname': obj.firstname || "",
                'email': obj.email || "",
                'password': obj.password,
                'date': new Date(),

            }
    }

    async login(req, res) {
        const { username, password, remember } = req.body;
        const users = await this.model.getBy({username});
        const user = users[0]

        if (user) {
            const verifPassword = await bcrypt.compare(password, user.password)
            if(verifPassword) {
                const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: EXPIRATION_TIME}); // Génération du token en utilisant l'ID de l'utilisateur
                //console.log(req.cookies)
                user.token = token
                user.isActive = true
                await this.model.update(user)
                res.cookie('Authentication', token, {
                    maxAge: remember ? 3600 * 24 * 365 + Date.now() : null,
                    //SameSite: 'none',
                    //secure: true,
                    //httpOnly: true
                })
                //console.log(req.get('Origin'))
                //console.log(user)
                res.send({token});
                return
            }
        }
        res.status(401)
        res.send({status: "error", message: 'Wrong username or password.'});
    }



}