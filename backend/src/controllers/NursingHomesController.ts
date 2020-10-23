import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //
import NursingHomeView from '../views/nursingHome_view';
import * as Yup from 'yup';

import NursingHome from '../models/NursingHome';

export default {
    async index(req: Request, res: Response) {
        const nursingHomeRepository = getRepository(NursingHome);

        const nursingHome = await nursingHomeRepository.find({
            relations: ['images']
        });

        return res.json(NursingHomeView.renderMany(nursingHome));

    },

    async show(req: Request, res: Response) {
        const { id } = req.params; 
        
        const nursingHomeRepository = getRepository(NursingHome);

        const nursingHomeOne = await nursingHomeRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(NursingHomeView.render(nursingHomeOne));
    },

    async create(req: Request, res: Response) {
        const {
            name, 
            latitude, 
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
            } = req.body;
    
        const nursingHomeRepository = getRepository(NursingHome);

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name, 
            latitude, 
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const nursingHome = nursingHomeRepository.create(data);

        await nursingHomeRepository.save(nursingHome);

        return res.status(201).json(nursingHome);
    }
}