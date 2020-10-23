import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import NursingHomesController from './controllers/NursingHomesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/nursingHome', NursingHomesController.index);
routes.get('/nursingHome/:id', NursingHomesController.show);
routes.post('/nursingHome', upload.array('images'), NursingHomesController.create);

export default routes;