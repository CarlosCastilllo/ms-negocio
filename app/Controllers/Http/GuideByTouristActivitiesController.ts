// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuideByTouristActivity from 'App/Models/GuideByTouristActivity'
import Guide from 'App/Models/Guide'
import TouristActivity from 'App/Models/TouristActivity'
import GuideByTouristActivityValidator from 'App/Validators/GuideByTouristActivityValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GuideByTouristActivitiesController {
  // GET /guide-by-tourist-activities or /guide-by-tourist-activities/:id
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        const rel = await GuideByTouristActivity.findOrFail(params.id)

        // Cargar relaciones si las necesitas
        await rel.load('guide')
        await rel.load('touristActivity')

        return rel
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await GuideByTouristActivity.query().preload('guide').preload('touristActivity').paginate(page, perPage)
      } else {
        return await GuideByTouristActivity.query().preload('guide').preload('touristActivity')
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /guide-by-tourist-activities
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GuideByTouristActivityValidator)

      const guide = await Guide.find(payload.guide_id)
      if (!guide) return response.notFound({ error: 'Guía no encontrado' })

      const activity = await TouristActivity.find(payload.tourist_activity_id)
      if (!activity) return response.notFound({ error: 'Actividad turística no encontrada' })

      const rel = await GuideByTouristActivity.create(payload)
      await rel.load('guide')
      await rel.load('touristActivity')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la asignación guía-actividad', error.status || 500)
    }
  }

  // PUT /guide-by-tourist-activities/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GuideByTouristActivityValidator)
      const rel = await GuideByTouristActivity.findOrFail(params.id)

      // Opcional: validar que existan guide y activity si vienen cambiados
      const guide = await Guide.find(payload.guide_id)
      if (!guide) return response.notFound({ error: 'Guía no encontrado' })

      const activity = await TouristActivity.find(payload.tourist_activity_id)
      if (!activity) return response.notFound({ error: 'Actividad turística no encontrada' })

      rel.guide_id = payload.guide_id
      rel.tourist_activity_id = payload.tourist_activity_id
      if (typeof payload.price !== 'undefined') rel.price = payload.price
      if (typeof payload.seats !== 'undefined') rel.seats = payload.seats
      if (typeof payload.notes !== 'undefined') rel.notes = payload.notes

      await rel.save()
      await rel.load('guide')
      await rel.load('touristActivity')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la asignación guía-actividad', error.status || 500)
    }
  }

  // DELETE /guide-by-tourist-activities/:id
  public async delete({ params, response }: HttpContextContract) {
    const rel = await GuideByTouristActivity.findOrFail(params.id)
    await rel.delete()
    response.status(204)
    return
  }
}
