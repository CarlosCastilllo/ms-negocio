// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanByTouristActivity from 'App/Models/PlanByTouristActivity'
import Plan from 'App/Models/Plan'
import TouristActivity from 'App/Models/TouristActivity'
import PlanByTouristActivityValidator from 'App/Validators/PlanByTouristActiviyValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class PlanByTouristActivitiesController {
  // GET /plan-by-tourist-activities or /plan-by-tourist-activities/:id
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        const rel = await PlanByTouristActivity.findOrFail(params.id)

        // Cargar objetos relacionados (si existen)
        const plan = await Plan.find(rel.plan_id)
        const activity = await TouristActivity.find(rel.tourist_activity_id)

        return { relation: rel, plan, touristActivity: activity }
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await PlanByTouristActivity.query().paginate(page, perPage)
      } else {
        return await PlanByTouristActivity.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /plan-by-tourist-activities
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanByTouristActivityValidator)
      // Opcional: verificar que plan y actividad existen
      const plan = await Plan.find(payload.plan_id)
      if (!plan) return response.notFound({ error: 'Plan asociado no encontrado' })

      const activity = await TouristActivity.find(payload.tourist_activity_id)
      if (!activity) return response.notFound({ error: 'Actividad turística asociada no encontrada' })

      const rel = await PlanByTouristActivity.create(payload)
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la relación plan-actividad', error.status || 500)
    }
  }

  // PUT /plan-by-tourist-activities/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanByTouristActivityValidator)
      const rel = await PlanByTouristActivity.findOrFail(params.id)

      rel.plan_id = payload.plan_id
      rel.tourist_activity_id = payload.tourist_activity_id
      if (typeof payload.price !== 'undefined') rel.price = payload.price
      if (typeof payload.quantity !== 'undefined') rel.quantity = payload.quantity
      if (typeof payload.notes !== 'undefined') rel.notes = payload.notes

      return await rel.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la relación plan-actividad', error.status || 500)
    }
  }

  // DELETE /plan-by-tourist-activities/:id
  public async delete({ params, response }: HttpContextContract) {
    const rel = await PlanByTouristActivity.findOrFail(params.id)
    await rel.delete()
    response.status(204)
    return
  }
}
