import express, {Router}    from 'express';
import { defaultRoute }     from './defaultRoute';
import { connectionRoute }  from './connectionRoute';
import { gameplayRoute }    from './gameplayRoute';
import { personalizeRoute } from './personalizeRoute';
import { creationRoute }    from "./creationRoute";
import { hubsRoute }        from "./hubsRoute";

export const routes: Router = express.Router();

routes.use(defaultRoute);
routes.use(connectionRoute);
routes.use(gameplayRoute);
routes.use(personalizeRoute);
routes.use(creationRoute);
routes.use(hubsRoute);