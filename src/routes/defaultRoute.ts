import { Router } from 'express';

export const defaultRoute = Router();
defaultRoute.get('/', function(req, res) {
    res.send('12');
});