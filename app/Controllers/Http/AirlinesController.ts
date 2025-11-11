import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Airline from 'App/Models/Airline';
import AirlineValidator from 'App/Validators/AirlineValidator';

export default class AirlinesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAirline: Airline = await Airline.findOrFail(params.id)
            return theAirline;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Airline.query().paginate(page, perPage)
            } else {
                return await Airline.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(AirlineValidator)
        const theAirline: Airline = await Airline.create(body);
        return theAirline;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAirline: Airline = await Airline.findOrFail(params.id);
        const body = request.body();
        theAirline.name = body.name;
        theAirline.accreditation = body.accreditation;
        theAirline.email = body.email;
        return await theAirline.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAirline: Airline = await Airline.findOrFail(params.id);
        response.status(204);
        return await theAirline.delete();
    }
}
