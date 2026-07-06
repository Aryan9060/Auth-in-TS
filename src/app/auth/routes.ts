import express, { Router } from 'express';
import AuthenticationController from './controller.js';

const authController = new AuthenticationController();


export const authRouter: Router = Router();


authRouter.post('/sign-up', authController.handelSingup.bind(authController));
authRouter.post('/sign-in', authController.handelSignin.bind(authController));
// authRouter.post('/sign-out')