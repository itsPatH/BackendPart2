import mongoose from "mongoose";

const collection = 'Users';

const cardSubSchema = new mongoose.Schema({
    
        number: String,
        type:{
            type: String,
            enum:['debit', 'credit'],
            default: 'debit',}

}, {timestamps: true, _id: false})

const schema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        //required: true
    },
    bankAccount: String,
    cards: [cardSubSchema]   
}, {timestamps:true})

const usersModel = mongoose.model(collection, schema);

export default usersModel;


/*TAYLOR'S VERSION:
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const collection = 'Users';

const cardSubSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{16}/.test(v); // Validar que sea un número de 16 dígitos
            },
            message: props => `${props.value} is not a valid card number!`
        }
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        default: 'debit',
        required: true
    }
}, { timestamps: true, _id: false });

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // Validar formato de email
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    bankAccount: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{8,20}/.test(v); // Validar que sea un número de entre 8 y 20 dígitos
            },
            message: props => `${props.value} is not a valid bank account number!`
        }
    },
    cards: [cardSubSchema]
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardarla
schema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar contraseñas
schema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const usersModel = mongoose.model(collection, schema);

export default usersModel;
*/
