import mongoose from 'mongoose'
import validator from 'validator'
import IUser from '../interface/IUser'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator(email: any) {
                return validator.isEmail(email);
            },
            message: '{VALUE} není platný email',
        },
    },
    password: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    role: {
        type: String,
        unique: false,
        required: false,
        default: 'user'
    },
    status: {
        type: Boolean,
        unique: false,
        required: false,
        default: true
    }
}, { timestamps: true })

userSchema.methods = {
    checkPassword: function (inputPassword: string): any {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: (plainTextPassword: string) => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

userSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('Uživatel nezadal heslo')
        next()
    } else {
        this.password = userSchema.methods.hashPassword(this.password)
        next()
    }
})

userSchema.pre('findOneAndUpdate', function (next) {

    const update: any = { ...this.getUpdate() }

    if (update.password) {
        update.password = userSchema.methods.hashPassword(update.password)
        this.setUpdate(update)
    }
    next()
})

export default mongoose.model<IUser>('User', userSchema)