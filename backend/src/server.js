import cookieParser from 'cookie-parser'
import express from 'express';
import cors from 'cors';
import Ajv from 'ajv';
import axios from 'axios';
import * as db from './db.js';
import * as models from './models.js';
import * as auth from './auth.js';
import * as mid from './middleware.js';
import { ProfileEditSchema, JoinSchema } from './schema.js'
import { StatusCodes } from 'http-status-codes'
import dotenv from 'dotenv'

const ajv = new Ajv();

// Load the configuration file
dotenv.config({ path: "config.env" });

const EMAIL_ALREADY_TAKEN = 0x1;
const USER_NOT_FOUND = 0x2;
const PASSWORD_DOES_NOT_MATCH = 0x3;

const app = express();
app.use(cors({
    origin: true,
    credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());

app.post("/api/join", async (req, res) => {
    if (!ajv.validate(JoinSchema, req.body)) {
        return res.status(StatusCodes.BAD_REQUEST).send();
    }
    const { name, email, password } = req.body;
    if (await models.User.getByEmail(req.body.email)) {
        return res.json({ ok: false, code: EMAIL_ALREADY_TAKEN });
    }
    await models.User.create({ name, email, password });
    return res.json({ ok: true });
});

app.post("/api/company/join", async (req, res) => {
    const { name, email, password } = req.body;
    const r = await models.Recruiter.findOne({ email }).exec();
    if (r) {
        return res.json({ ok: false, code: EMAIL_ALREADY_TAKEN });
    }
    await models.Recruiter.create({ name, email, password });
    return res.json({ ok: true });
})


app.post("/api/auth", async (req, res) => {
    const { type } = req.query;
    const { email, password } = req.body;
    if (type == 'r') {
        const r = await models.Recruiter.findOne({ email }).exec();
        if (!r) {
            return res.status(StatusCodes.NOT_FOUND).send();
        } else if ( r.password != password) {
            return res.status(StatusCodes.FORBIDDEN).send();
        }
        var jwt = await auth.generateRecruiterAuthToken(r);
    } else if (type == 'u') {
        const user = await models.User.getByEmail(email);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ ok: false, code: USER_NOT_FOUND });
        } else if (user.password != password) {
            return res.status(StatusCodes.FORBIDDEN).json({ ok: false, cdode: PASSWORD_DOES_NOT_MATCH });
        }
        var jwt = await auth.generateUserAuthToken(user);
    }

    res.cookie('auth_token', jwt, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 100 });
    return res.json({ ok: true, token: jwt });
});

app.get('/api/profile/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await models.User.findById(uid).exec();
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send();
    }
    const { email, username, bio } = user;
    const profileUrl = req.url;
    return res.json({ profileUrl, email, username, bio });
});


app.use(mid.authentication());
app.use(mid.authenticatedOnly());

app.use(mid.useUser());
app.use(mid.useRecruiter());

app.get('/api/ping/1', 
    mid.needUser(),
(req, res) => {
    return res.json({ msg: 'PONG', session: { id: req.session }, user: req.user });
});

app.get('/api/ping/2', 
    mid.needRecruiter(),
(req, res) => {
    return res.json({ msg: 'PONG', session: { id: req.session }, recruiter: req.recruiter });

});

app.get('/api/profile', 
    mid.needUser(),
async (req, res) => {
    return res.json(req.user);
});

app.get('/api/company/profile', 
    mid.needRecruiter(),
async (req, res) => {
    return res.json(req.recruiter);
});

app.post('/api/edit/profile', 
    mid.validateSchema(ajv, ProfileEditSchema),
async (req, res) => {
    const { session } = req;
    await models.User.updateOne({ _id: session.uid }, req.body).exec();
    return res.json(StatusCodes.OK);
});

// Sends a job offer to an user on behalf of the company
app.post('/api/offer', async (req, res) => {
    
});

app.listen(8000, () => console.log(`successfully listening at ${8000}`))
