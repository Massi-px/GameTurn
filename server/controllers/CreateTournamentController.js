import CreateTournamentModel from '../models/CreateTournamentModel.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'b5229094eae24fbfb8f70d6a82f640a35a6607600674526129bc55dbf036c70c50551b25c688c3dc495bf5d649ce0f2a0323ed61315308bf2b9fe3c3ff8b2f22'
export default async function CreateTournamentController(req, res) {
    const { name, start_date, end_date, nmbrParticipants, game } = req.body;
    let tournament = await CreateTournamentModel(name, start_date, end_date, nmbrParticipants, game);

    if(tournament){
        return res.status(200).json({ message: 'création du tournoi réussit !' });
    }
    else{return res.status(401).json({ message: 'Token invalide. Authentifiez-vous pour accéder à cette ressource.' });}
}
