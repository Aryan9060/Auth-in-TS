import type { Request, Response } from 'express';
import { userSchema } from './models.js';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import { userTable } from '../../db/schema.js';
import { createHmac, randomBytes } from 'node:crypto';


const hashPassword = (password: string, salt: string) => {
    return createHmac('sha256', salt).update(password).digest("hex");
}

class AuthenticationController {

    public async handelSingup(req: Request, res: Response) {
        const validateResult = await userSchema.safeParseAsync(req.body);
        if (validateResult.error) return res.status(400).json({ message: 'body validation failed', error: validateResult.error })
        const { firstName, lastName, email, password } = validateResult.data

        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email))
        if (userEmailResult.length > 0) return res.status(400).json({ message: `user with email ${email} already exists`, error: "dplicate entry" })

        const salt = randomBytes(32).toString('hex');
        const hash = createHmac('sha256', salt).update(password).digest("hex");

        const [result] = await db.insert(userTable).values({ firstName, lastName, email, password: hash, salt }).returning({ id: userTable.id })

        return res.status(201).json({ message: 'user created successfully', data: result?.id })


    }

    public async handelSignin(req: Request, res: Response) {
        const validateResult = await userSchema.safeParseAsync(req.body);
        if (validateResult.error) return res.status(400).json({ message: 'body validation failed', error: validateResult.error });

        const { email, password } = validateResult.data;
        const [userFromDb] = await db.select().from(userTable).where(eq(userTable.email, email));
        console.log("Existed user --> ", userFromDb);

        if (!userFromDb) return res.status(404).json({ message: `user with email ${email} does not exist` })

        const salt = userFromDb.salt!;
        const hash = hashPassword(password, salt);
        if (userFromDb.password !== hash) return res.status(401).json({ message: 'invalid credentials' })

        //TODO : create tocken

        return res.status(200).json({ message: 'user signed in successfully', data: { token: 1 } });

    }
}

export default AuthenticationController;