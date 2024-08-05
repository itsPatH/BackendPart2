import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { usersService } from "../managers/index.js";
import AuthService from "../services/AuthService.js";

const JWT_SECRET = 'config';

const initializePassportConfig = () => {
    passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            const { firstName, lastName, birthDate } = req.body;

            if (!firstName || !lastName || !email || !password) {
                return done(null, false, { message: 'Incomplete values' });
            }

            try {
                const existingUser = await usersService.getUserByEmail(email);
                if (existingUser) {
                    return done(null, false, { message: "User already exists" });
                }

                let parsedDate;
                if (birthDate) {
                    parsedDate = new Date(birthDate).toISOString();
                }

                const authService = new AuthService();
                const hashedPassword = authService.hashPassword(password);
                const newUser = {
                    firstName,
                    lastName,
                    email: email.toLowerCase(),
                    birthDate: parsedDate,
                    password: hashedPassword,
                };

                const result = await usersService.createUser(newUser);
                return done(null, result);
            } catch (error) {
                return done(null, false, { message: error.message });
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await usersService.getUserByEmail(email.toLowerCase());
                if (!user) {
                    return done(null, false, { message: "Incorrect credentials" });
                }

                const authService = new AuthService();
                const isValidPassword = authService.validatePassword(password, user.password);
                if (!isValidPassword) {
                    return done(null, false, { message: "Incorrect credentials" });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('jwt', new JWTStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    }, async (payload, done) => {
        try {
            const user = await usersService.getUserById(payload.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};

function cookieExtractor(req) {
    return req?.cookies?.['Katys Token'];
}

export default initializePassportConfig;
