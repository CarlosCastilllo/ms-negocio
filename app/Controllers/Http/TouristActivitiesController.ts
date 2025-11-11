// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TouristActivity from 'App/Models/TouristActivity'
import TouristActivityValidator from 'App/Validators/TouristActivityValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class TouristActivitiesController {
  // GET /tourist-activities o /tourist-activities/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const activity = await TouristActivity.findOrFail(params.id)
        return activity
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await TouristActivity.query().paginate(page, perPage)
      } else {
        return await TouristActivity.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /tourist-activities
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(TouristActivityValidator)
      const activity = await TouristActivity.create(payload)
      return activity
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la actividad turística', error.status || 500)
    }
  }

  // PUT /tourist-activities/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(TouristActivityValidator)
      const activity = await TouristActivity.findOrFail(params.id)

      activity.name = payload.name
      activity.location = payload.location
      activity.price = payload.price

      return await activity.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la actividad turística', error.status || 500)
    }
  }

  // DELETE /tourist-activities/:id
  public async delete({ params, response }: HttpContextContract) {
    const activity = await TouristActivity.findOrFail(params.id)
    await activity.delete()
    response.status(204)
    return
  }
}
