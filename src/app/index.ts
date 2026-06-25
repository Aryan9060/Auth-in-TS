import express, { type Application } from "express";


export default function createApplication(): Application {
    const app: Application = express();

    //* middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    //* Routes
    

    return app;
}