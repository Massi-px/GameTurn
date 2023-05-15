import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleLoginModels from "../models/GoogleLoginModels.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: 'your_client_id',
            clientSecret: 'your_client_secret',
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Vérifier si l'utilisateur existe dans la base de données
                const user = await GoogleLoginModels(profile.id);

                if (!user) {
                    // Créer un nouvel utilisateur dans la base de données
                    await createUser(profile.id, profile.displayName, profile.emails[0].value);
                }

                return done(null, profile);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
