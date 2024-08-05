import User from '../managers/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt';

class AuthService {
    static async registerUser({ firstName, lastName, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        return newUser;
    }

    static async loginUser(email) {
        const user = await User.findOne({ email });
        return user;
    }

    static async validatePassword(userInputPassword, userStoredPassword) {
        return await bcrypt.compare(userInputPassword, userStoredPassword);
    }
}

export default AuthService;