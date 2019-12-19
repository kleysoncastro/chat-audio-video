import { Router } from 'express';

import ControllerStream from './app/controller/ControllerRom';

const routes = new Router();

routes.post('/chat', ControllerStream.store);

export default routes;
