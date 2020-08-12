import { environment } from './../common/environments';
import mongoose from '../database/database';
import bcrypt from 'bcrypt';
import { Object } from './objects';

/* const AccountRepeat = new mongoose.Schema({
    initialDate: {
        type: Date,
        required: false
    },
    finalDate: {
        type: Date,
        required: false
    },
    interval: {
        type: String,
        required: false,
        enum: ['Hour', 'Day', 'Month', 'Year', 'Decade'],
        default: 'Month'
    }
});*/
const ObjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['bar', 'horizontalBar', 'line', 'pie', 'doughnut'],
        default: 'bar'
    },
    backgroundColor: {
        type: [String],
        required: true,
        default: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)']
    },
    borderColor: {
        type: [String],
        required: true,
        default: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)']
    },
    borderWidth: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });
const UserEarnings = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    value: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    accountRepeat: {
        type: Number,
        required: true,
        default: 1
    }
},
    { timestamps: true });
const UserCosts = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    value: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    accountRepeat: {
        type: Number,
        required: true,
        default: 1
    }
},
    { timestamps: true });
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['M', 'F', 'O']
    },
    profileImage: {
        type: String,
        required: false
    },
    emailConfirmed: {
        type: Boolean,
        default: false,
        select: false
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    earnings: { type: [UserEarnings] },
    costs: { type: [UserCosts] },
    objects: { type: [ObjectSchema] }
},
    { timestamps: true });
UserSchema.pre('save', async function (next) {
    const user: any = this
    if (!user.isModified('password')) {
        next()
    } else {
        try {
            const hash = await bcrypt.hash(user.password, environment.security.saltRounds)
            user.password = hash
            next()
        } catch (err) {
            next(err)
        }
    }
});

export const User = mongoose.model('User', UserSchema);