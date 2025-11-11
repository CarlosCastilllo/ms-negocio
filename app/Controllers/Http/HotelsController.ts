import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class HotelsController {
  // GET /hotels o /hotels/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const hotel = await Hotel.findOrFail(params.id)
        return hotel
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Hotel.query().paginate(page, perPage)
      } else {
        return await Hotel.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /hotels
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(HotelValidator)
      const hotel = await Hotel.create(payload)
      return hotel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear el hotel', error.status || 500)
    }
  }

  // PUT /hotels/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(HotelValidator)
      const hotel = await Hotel.findOrFail(params.id)

      hotel.name = payload.name
      hotel.address = payload.address
      hotel.city = payload.city
      hotel.phone = payload.phone
      hotel.administrator_id = payload.administrator_id

      return await hotel.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar el hotel', error.status || 500)
    }
  }

  // DELETE /hotels/:id
  public async delete({ params, response }: HttpContextContract) {
    const hotel = await Hotel.findOrFail(params.id)
    await hotel.delete()
    response.status(204)
    return
  }
}
