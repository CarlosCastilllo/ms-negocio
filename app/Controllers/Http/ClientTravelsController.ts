import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientTravel from 'App/Models/ClientTravel';
import ClientTravelValidator from 'App/Validators/ClientTravelValidator';

export default class ClientTravelsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theClientTravel: ClientTravel = await ClientTravel.findOrFail(params.id)
            return theClientTravel;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ClientTravel.query().paginate(page, perPage)
            } else {
                return await ClientTravel.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(ClientTravelValidator)
        const theClientTravel: ClientTravel = await ClientTravel.create(body);
        return theClientTravel;
    }

    public async update({ params, request }: HttpContextContract) {
        const theClientTravel: ClientTravel = await ClientTravel.findOrFail(params.id);
        const body = request.body();
        theClientTravel.client_id = body.client_id;
        theClientTravel.travel_id = body.travel_id;
        return await theClientTravel.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theClientTravel: ClientTravel = await ClientTravel.findOrFail(params.id);
        response.status(204);
        return await theClientTravel.delete();
    }
}
