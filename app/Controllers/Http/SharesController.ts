import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Share from 'App/Models/Share';
import ShareValidator from 'App/Validators/ShareValidator';

export default class SharesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theShare: Share = await Share.findOrFail(params.id)
            return theShare;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Share.query().paginate(page, perPage)
            } else {
                return await Share.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(ShareValidator)
        const theShare: Share = await Share.create(body);
        return theShare;
    }

    public async update({ params, request }: HttpContextContract) {
        const theShare: Share = await Share.findOrFail(params.id);
        const body = request.body();
        theShare.cantity = body.cantity;
        theShare.price = body.price;
        theShare.travel_id = body.travel_id;
        return await theShare.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShare: Share = await Share.findOrFail(params.id);
        response.status(204);
        return await theShare.delete();
    }
}
