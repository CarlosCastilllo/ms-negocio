// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'
import CarValidator from 'App/Validators/CarValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class CarsController {
  // GET /cars o /cars/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const car = await Car.findOrFail(params.id)
        return car
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Car.query().paginate(page, perPage)
      } else {
        return await Car.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /cars
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CarValidator)
      const car = await Car.create(payload)
      return car
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear el carro', error.status || 500)
    }
  }

  // PUT /cars/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CarValidator)
      const car = await Car.findOrFail(params.id)

      car.license_plate = payload.license_plate
      car.brand = payload.brand
      car.model = payload.model
      car.color = payload.color
      car.administrator_id = payload.administrator_id

      return await car.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar el carro', error.status || 500)
    }
  }

  // DELETE /cars/:id
  public async delete({ params, response }: HttpContextContract) {
    const car = await Car.findOrFail(params.id)
    await car.delete()
    response.status(204)
    return
  }
}
