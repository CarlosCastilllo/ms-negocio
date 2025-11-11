import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Itinerary from 'App/Models/Itinerary';
import ItineraryValidator from 'App/Validators/ItineraryValidator';

export default class ItinerarysController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theItinerary: Itinerary = await Itinerary.findOrFail(params.id)
            return theItinerary;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Itinerary.query().paginate(page, perPage)
            } else {
                return await Itinerary.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(ItineraryValidator)
        const theItinerary: Itinerary = await Itinerary.create(body);
        return theItinerary;
    }

    public async update({ params, request }: HttpContextContract) {
        const theItinerary: Itinerary = await Itinerary.findOrFail(params.id);
        const body = request.body();
        theItinerary.order = body.order;
        theItinerary.travel_id = body.travel_id;
        theItinerary.journey_id = body.journey_id;
        theItinerary.transport_service_id = body.transport_service_id;
        return await theItinerary.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theItinerary: Itinerary = await Itinerary.findOrFail(params.id);
        response.status(204);
        return await theItinerary.delete();
    }
}
