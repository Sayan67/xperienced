import mongoose, { Schema, Types } from 'mongoose'

export const User = mongoose.model('User', new Schema({
    name: String,
    email: String,
    password: String,
    bio: { type: String, default: '' },
    location: String,
    avatar: String,
    experience: [{ 
        role: String, 
        tenure: [Number],
        company: [String],
        logo: String,
    }],
    oauth: {
        github: {
            access_token: String,
            scope: String,
            token_type: String,
            id: Number,
        }
    },
}, {
    statics: {
        async getByEmail(email) {
            return await this.findOne({ email }).exec()
        },
    }
}));

export const Session = mongoose.model('Session', new Schema({
    sid: String,
    uid: { type: mongoose.Types.ObjectId, ref: 'User' },
    rid: { type: mongoose.Types.ObjectId, ref: 'Recruiter' },
    category: String,
}, {
    statics: {
        onlyRecruiter() { return this.where({ category: 'r' }); },
        onlyUser() { return this.where({ category: 'u' }) },
        byUser(user) { return this.where({ uid: user._id }); },
        async getByUser(user) { return await this.byUser(user).exec(); },
    }
}));

export const Recruiter = mongoose.model('Recruiter', new Schema({
    email: String,
    name: String,
    description: {type: String, default: ''},
    site_url: String,
    password: String,
    verified: { type: Boolean, default: false },
}));

export const Offer = mongoose.model('Offer', new Schema({
    from: { type: Types.ObjectId, ref: 'Recruiter' },
    to: { type: Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    is_remote: Boolean,
    schedule: {
        start: String,
        end: String,
        is_negotiable: { type: Boolean, default: false },
        duration: Number, // in hours 
        days_per_week: Number,
    },
    location: String, // Job Location
}));

