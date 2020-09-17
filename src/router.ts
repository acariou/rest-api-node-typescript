import { Application } from "express-serve-static-core";

import { Router, Request, Response, NextFunction } from 'express';

const router = (app: Application) => {
    const apiRouter: Router = Router();

    apiRouter.get('/', (req: Request, res: Response) => {
        res.status(200).json({message: "This is where the awesomeness happen..."});
    });
  
    app.use('/api/v1', apiRouter);
};

export default router;