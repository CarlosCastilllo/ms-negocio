// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import PlanValidator from 'App/Validators/PlanValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class PlansController {
  // GET /plans o /plans/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const plan = await Plan.findOrFail(params.id)
        return plan
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Plan.query().paginate(page, perPage)
      } else {
        return await Plan.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /plans
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanValidator)
      const plan = await Plan.create(payload)
      return plan
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear el plan', error.status || 500)
    }
  }

  // PUT /plans/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PlanValidator)
      const plan = await Plan.findOrFail(params.id)

      plan.name = payload.name
      plan.price = payload.price
      plan.hotel_id = payload.hotel_id
      plan.guide_id = payload.guide_id
      plan.car_id = payload.car_id
      plan.administrator_id = payload.administrator_id

      return await plan.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar el plan', error.status || 500)
    }
  }

  // DELETE /plans/:id
  public async delete({ params, response }: HttpContextContract) {
    const plan = await Plan.findOrFail(params.id)
    await plan.delete()
    response.status(204)
    return
  }
}

