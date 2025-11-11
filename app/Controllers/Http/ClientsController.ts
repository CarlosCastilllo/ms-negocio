import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import ClientValidator from 'App/Validators/ClientValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class ClientsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theClient: Client = await Client.findOrFail(params.id)
            
            // Llamada al microservicio de usuarios
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theClient.user_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
        });

        // Verificar si userResponse.data es null o está vacío
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario en el microservicio', 404);
        }

        // Combinar la respuesta con los datos del administrador
        console.log({ administrador: theClient, usuario: userResponse.data })
        return { administrador: theClient, usuario: userResponse.data };
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Client.query().paginate(page, perPage)
            } else {
                return await Client.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        
        const body = await request.validate(ClientValidator)
        const theClient: Client = await Client.create(body);
        return theClient;
    }

    public async update({ params, request }: HttpContextContract) {
        const theClient: Client = await Client.findOrFail(params.id);
        const body = request.body();
        theClient.user_id = body.user_id;
        theClient.identification = body.identification;
        theClient.age = body.age;
        return await theClient.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theClient: Client = await Client.findOrFail(params.id);
        response.status(204);
        return await theClient.delete();
    }
}
