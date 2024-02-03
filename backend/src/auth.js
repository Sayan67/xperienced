import * as jose from 'jose'
import * as dotenv from 'dotenv'
import { Session } from './models.js'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

import { createHash } from 'crypto'

dotenv.config({ path: 'config.env' })

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET } = process.env;


async function generateSessionId(user) {
    const sessions = await Session.getByUser(user);
    if (sessions.length >= 5) {
        throw new Error("maximum number of sessions per user exceeded");
    }
    const encoder = new TextEncoder();
    for (let i = 0; i <= sessions.length; ++i) {
        const t = `${user._id}^${i}`;
        const id = createHash('sha256').update(encoder.encode(t)).digest('hex');

        if (!sessions.find(v => v.sid == id)) {
            return id; 
        }
    }
}

export async function createSession(user, category) {
    const id = await generateSessionId(user);
    if (category === 'u') {
        return await Session.create({ sid: id, uid: user._id, category });
    } else {
        return await Session.create({ sid: id, rid: user._id, category });

    }
}

export function generateUserAuthToken(user) {
    return generateAuthToken(user, 'u');
}

export function generateRecruiterAuthToken(r) {
    return generateAuthToken(r, 'r')
}

export async function generateAuthToken(user, aud) {
    const { email } = user;
    const session = await createSession(user, aud);

    const alg = 'HS256'; 
    const jwt = await new jose.SignJWT({ name: email })
        .setSubject(session.sid)
        .setProtectedHeader({ alg })
        .setIssuer('hackify.io')
        .setAudience(aud)
        .sign(secret);
        
    return jwt;
}

export class JWTVerificationFailed extends Error {
    constructor(token) {
        super(`Failed to verify JWT token`);
        this.token = token;
    }
}


export async function getSessionFromAuthToken(token) {
    const { payload } = await jose.jwtVerify(token, secret).catch(_ => { throw new JWTVerificationFailed(token) }) ;
    const session = await Session.findOne({ sid: payload.sub }).exec()
    return session;
}

export async function requestGithubOAuthAccessToken(code) {
    const { data, status } = await axios.post('https://github.com/login/oauth/access_token', {}, {
        headers: {
            Accept: 'application/json'
        },
        params: {
            client_id: GITHUB_OAUTH_CLIENT_ID,
            client_secret: GITHUB_OAUTH_CLIENT_SECRET,
            code,
        }
    });

    return status == StatusCodes.OK ? data : null;
}

export async function fetchGithubUserData(token) {
    return await axios.get('https://api.github.com/user', { 
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer ' + token,
        }    
    }).then(({ data }) => data);
}

export async function deleteGithubAccessToken(access_token) {
    return await axios.delete(`https://api.github.com/applications/${GITHUB_OAUTH_CLIENT_ID}/token`, 
    {
        data: { access_token },
        auth: {
            username: GITHUB_OAUTH_CLIENT_ID,
            password: GITHUB_OAUTH_CLIENT_SECRET,
        },
        headers: {
            Accept: 'application/vnd.github+json',
        }
    });
}


