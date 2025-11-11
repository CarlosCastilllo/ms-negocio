import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransportService from 'App/Models/TransportService';
import TransportServiceValidator from 'App/Validators/TransportServiceValidator';

export default class TransportServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTransportService: TransportService = await TransportService.findOrFail(params.id)
            return theTransportService;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await TransportService.query().paginate(page, perPage)
            } else {
                return await TransportService.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validator = new TransportServiceValidator({} as any)
        const body = await request.validate(TransportServiceValidator)
        await validator.validateExtra(body)
        const theTransportService: TransportService = await TransportService.create(body);
        return theTransportService;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTransportService: TransportService = await TransportService.findOrFail(params.id);
        const body = request.body();
        theTransportService.start = body.start;
        theTransportService.end = body.end;
        theTransportService.vehicle_id = body.vehicle_id;
        theTransportService.journey_id = body.journey_id;
        return await theTransportService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTransportService: TransportService = await TransportService.findOrFail(params.id);
        response.status(204);
        return await theTransportService.delete();
    }
}
