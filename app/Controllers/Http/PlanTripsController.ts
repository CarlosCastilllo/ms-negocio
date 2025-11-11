// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanTrip from 'App/Models/PlanTrip'
import Plan from 'App/Models/Plan'
import Trip from 'App/Models/PlanTrip'
import PlanTripValidator from 'App/Validators/PlanTripValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class PlanTripsController {
  // GET /plan-trips o /plan-trips/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const rel = await PlanTrip.findOrFail(params.id)
        await rel.load('plan')
        await rel.load('trip')
        return rel
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await PlanTrip.query().preload('plan').preload('trip').paginate(page, perPage)
      } else {
        return await PlanTrip.query().preload('plan').preload('trip')
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /plan-trips
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanTripValidator)

      const plan = await Plan.find(payload.plan_id)
      if (!plan) return response.notFound({ error: 'Plan no encontrado' })

      const trip = await Trip.find(payload.trip_id)
      if (!trip) return response.notFound({ error: 'Viaje no encontrado' })

      const rel = await PlanTrip.create(payload)
      await rel.load('plan')
      await rel.load('trip')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la relación plan-viaje', error.status || 500)
    }
  }

  // PUT /plan-trips/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanTripValidator)
      const rel = await PlanTrip.findOrFail(params.id)

      const plan = await Plan.find(payload.plan_id)
      if (!plan) return response.notFound({ error: 'Plan no encontrado' })

      const trip = await Trip.find(payload.trip_id)
      if (!trip) return response.notFound({ error: 'Viaje no encontrado' })

      rel.plan_id = payload.plan_id
      rel.travel_id = payload.trip_id
      if (typeof payload.total_price !== 'undefined') rel.total_price = payload.total_price
      if (typeof payload.notes !== 'undefined') rel.notes = payload.notes

      await rel.save()
      await rel.load('plan')
      await rel.load('trip')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la relación plan-viaje', error.status || 500)
    }
  }

  // DELETE /plan-trips/:id
  public async delete({ params, response }: HttpContextContract) {
    const rel = await PlanTrip.findOrFail(params.id)
    await rel.delete()
    response.status(204)
    return
  }
}

