import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// users => id, username, email, password, fullName, 
// createdAt, updatedAt, avatar, coverImage, refreshToken
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
        lowercase: true, 
    },
    fullName: {
        required: true,
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        // required: true,
    },
    coverImage: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Todo"
        }
    ]
}, {timestamps: true});

// password encryption
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

// to compare the password
userSchema.methods.isPasswordSame = async function(password){
    if (!password) {
        throw new Error("req.body password is missing");
    }
    if (!this.password) {
        throw new Error("db password is missing");
    }

    // comparison
    return await bcrypt.compare(password, this.password)
};

// generate access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            // payload data, means the data we want to send with the token
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

// generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            // payload, for refresh token we just send _id
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const User = mongoose.model("User", userSchema);