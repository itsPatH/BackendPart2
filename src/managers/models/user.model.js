import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const collection = 'Users';

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            index: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age must be a positive number'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'], 
            default: 'user',
        },
    },
    { timestamps: true }
);

schema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

schema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const usersModel = mongoose.model(collection, schema);

export default usersModel;