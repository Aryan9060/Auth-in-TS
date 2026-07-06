import JWT from 'jsonwebtoken';

interface userTokenPayload {
    id: string;
}

export const createUserToken = (payload: userTokenPayload) => {
    return JWT.sign(payload, process.env.JWT_SECRET!);
}

export const verifyUserToken = (token: string) => {
    return JWT.verify(token, process.env.JWT_SECRET!) as userTokenPayload;
}
