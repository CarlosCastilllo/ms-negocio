// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoomTrip from 'App/Models/RoomTrip'
import Room from 'App/Models/Room'
import Trip from 'App/Models/Travel'
import RoomTripValidator from 'App/Validators/RoomTripValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class RoomTripsController {
  // GET /room-trips o /room-trips/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const rel = await RoomTrip.findOrFail(params.id)
        await rel.load('room')
        await rel.load('trip')
        return rel
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await RoomTrip.query().preload('room').preload('trip').paginate(page, perPage)
      } else {
        return await RoomTrip.query().preload('room').preload('trip')
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /room-trips
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoomTripValidator)

      const room = await Room.find(payload.room_id)
      if (!room) return response.notFound({ error: 'Habitación no encontrada' })

      const trip = await Trip.find(payload.trip_id)
      if (!trip) return response.notFound({ error: 'Viaje no encontrado' })

      const rel = await RoomTrip.create(payload)
      await rel.load('room')
      await rel.load('trip')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear la relación habitación-viaje', error.status || 500)
    }
  }

  // PUT /room-trips/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoomTripValidator)
      const rel = await RoomTrip.findOrFail(params.id)

      const room = await Room.find(payload.room_id)
      if (!room) return response.notFound({ error: 'Habitación no encontrada' })

      const trip = await Trip.find(payload.trip_id)
      if (!trip) return response.notFound({ error: 'Viaje no encontrado' })

      rel.room_id = payload.room_id
      rel.travel_id = payload.trip_id
      rel.check_in_date = payload.check_in_date
      rel.check_out_date = payload.check_out_date
      rel.total_price = payload.total_price
      rel.notes = payload.notes

      await rel.save()
      await rel.load('room')
      await rel.load('trip')
      return rel
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar la relación habitación-viaje', error.status || 500)
    }
  }

  // DELETE /room-trips/:id
  public async delete({ params, response }: HttpContextContract) {
    const rel = await RoomTrip.findOrFail(params.id)
    await rel.delete()
    response.status(204)
    return
  }
}

