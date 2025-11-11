import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Journey from 'App/Models/Journey';
import JourneyValidator from 'App/Validators/JourneyValidator';

export default class JourneysController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theJourney: Journey = await Journey.findOrFail(params.id)
            return theJourney;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Journey.query().paginate(page, perPage)
            } else {
                return await Journey.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validator = new JourneyValidator({} as any)
        const body = await request.validate(JourneyValidator)
        await validator.validateExtra(body)
        const theJourney: Journey = await Journey.create(body);
        return theJourney;
    }

    public async update({ params, request }: HttpContextContract) {
        const theJourney: Journey = await Journey.findOrFail(params.id);
        const body = request.body();
        theJourney.duration = body.duration;
        theJourney.distance = body.distance;
        theJourney.origin = body.origin;
        theJourney.destination = body.destination;
        return await theJourney.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theJourney: Journey = await Journey.findOrFail(params.id);
        response.status(204);
        return await theJourney.delete();
    }
}
