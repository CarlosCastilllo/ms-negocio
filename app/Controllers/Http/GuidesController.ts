// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guide from 'App/Models/Guide'
import GuideValidator from 'App/Validators/GuideValidator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GuidesController {
  // GET /guides o /guides/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const guide = await Guide.findOrFail(params.id)
        return guide
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Guide.query().paginate(page, perPage)
      } else {
        return await Guide.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /guides
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GuideValidator)
      const guide = await Guide.create(payload)
      return guide
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al crear el guía', error.status || 500)
    }
  }

  // PUT /guides/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GuideValidator)
      const guide = await Guide.findOrFail(params.id)

      guide.name = payload.name
      guide.lastname = payload.lastname
      guide.identification = payload.identification
      guide.phone = payload.phone
      guide.email = payload.email
      guide.user_id = payload.user_id
    
      return await guide.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al actualizar el guía', error.status || 500)
    }
  }

  // DELETE /guides/:id
  public async delete({ params, response }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    await guide.delete()
    response.status(204)
    return
  }
}
