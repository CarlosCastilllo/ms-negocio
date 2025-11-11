// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import RoomValidator from 'App/Validators/RoomValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class RoomsController {
  // GET /rooms o /rooms/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const room = await Room.findOrFail(params.id)
        return room
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Room.query().paginate(page, perPage)
      } else {
        return await Room.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /rooms
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoomValidator)
      const room = await Room.create(payload)
      return room
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la habitación', error.status || 500)
    }
  }

  // PUT /rooms/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoomValidator)
      const room = await Room.findOrFail(params.id)

      room.number = payload.number
      room.type = payload.type
      room.price = payload.price
      room.status = payload.status
      room.hotel_id = payload.hotel_id

      return await room.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la habitación', error.status || 500)
    }
  }

  // DELETE /rooms/:id
  public async delete({ params, response }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    await room.delete()
    response.status(204)
    return
  }
}

