import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Travel from 'App/Models/Travel';
import TravelValidator from 'App/Validators/TravelValidator';

export default class TravelsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTravel: Travel = await Travel.findOrFail(params.id)
            return theTravel;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Travel.query().paginate(page, perPage)
            } else {
                return await Travel.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validator = new TravelValidator({} as any)
        const body = await request.validate(TravelValidator)
        // Validación adicional (fecha inicio < fecha fin)
        await validator.validateExtra(body)
        const theTravel: Travel = await Travel.create(body);
        return theTravel;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTravel: Travel = await Travel.findOrFail(params.id);
        const body = request.body();
        theTravel.start_date = body.start_date;
        theTravel.end_date = body.end_date;
        theTravel.price = body.price;
        return await theTravel.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTravel: Travel = await Travel.findOrFail(params.id);
        response.status(204);
        return await theTravel.delete();
    }
}
