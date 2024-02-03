import { StatusCodes } from "http-status-codes";
import { Recruiter, User } from "./models.js";
import * as auth from './auth.js';

export function validateSchema(ajv, schema) {
    return (req, res, next) => {
        if (!ajv.validate(schema, req.body)) {
            return res.status(StatusCodes.BAD_REQUEST).send();
        }
        next();
    };
}

export function  authentication() {
    return async (req, res, next) => {
        const { auth_token } = req.cookies;
        if (!auth_token) {
            return res.status(StatusCodes.FORBIDDEN).send('auth_token cookie not set');
        }
    
        try {
            const session = await auth.getSessionFromAuthToken(auth_token);
            if (!session) {
                return res.status(StatusCodes.FORBIDDEN).send();
            }
            req.session = session;
            next();
        } catch (e) {
            if (e instanceof auth.JWTVerificationFailed) {
                return res.status(StatusCodes.FORBIDDEN).send();
            }
        }
    };
}

export function authenticatedOnly() {
    return (req, res, next) => {
        console.log(req.session);
        if (!req.session) {
            return res.status(StatusCodes.FORBIDDEN).send();
        }
        next();
    };
}

export function useUser() {
    return async (req, res, next) => {
        const { session } = req;
        if (session.category == 'u') {
            req.user = await User.findById(session.uid).exec();
        }
        next();
    };
}

export function useRecruiter() {
    return async (req, _, next) => {
        const { session } = req;
        if (session.category == 'r') {
            req.recruiter = await Recruiter.findById(session.rid).exec();
            console.log(req.recruiter);
        }
        next();
    };
}

export function needUser() {
    return async (req, res, next) => {
        const { user } = req;
        if (!user) {
            return res.status(StatusCodes.FORBIDDEN).send();
        }
        next();
    };
}

export function needRecruiter() {
    return async (req, res, next) => {
        const { recruiter } = req;
        if (!recruiter) {
            return res.status(StatusCodes.FORBIDDEN).send();
        }
        next();
    };
}