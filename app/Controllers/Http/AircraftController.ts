import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aircraft from 'App/Models/Aircraft';
import AircraftValidator from 'App/Validators/AircraftValidator';

export default class AircraftsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAircraft: Aircraft = await Aircraft.findOrFail(params.id)
            return theAircraft;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Aircraft.query().paginate(page, perPage)
            } else {
                return await Aircraft.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(AircraftValidator)
        const theAircraft: Aircraft = await Aircraft.create(body);
        return theAircraft;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAircraft: Aircraft = await Aircraft.findOrFail(params.id);
        const body = request.body();
        theAircraft.model = body.model;
        theAircraft.capacity = body.capacity;
        theAircraft.airline_id = body.airline_id;
        theAircraft.vehicle_id = body.vehicle_id
        return await theAircraft.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAircraft: Aircraft = await Aircraft.findOrFail(params.id);
        response.status(204);
        return await theAircraft.delete();
    }
}
