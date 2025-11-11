// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator'
import AdministratorValidator from 'App/Validators/AdministratorValidator'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'
import { Exception } from '@adonisjs/core/build/standalone'

export default class AdministratorsController {
  // GET /administrators o /administrators/:id
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        const administrator = await Administrator.findOrFail(params.id)

        // Llamar microservicio de seguridad
        const token = request.headers().authorization || ''
        const userResp = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${administrator.user_id}`, {
          headers: { Authorization: token },
        })

        if (!userResp.data || Object.keys(userResp.data).length === 0) {
          return response.notFound({ error: 'Usuario no encontrado en el microservicio de seguridad' })
        }

        return { administrator, user: userResp.data }
      }

      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Administrator.query().paginate(page, perPage)
      } else {
        return await Administrator.query()
      }
    } catch (error: any) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // POST /administrators
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AdministratorValidator)
      const body = request.body()

      const token = request.headers().authorization || ''
      const userResp = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.user_id}`, {
        headers: { Authorization: token },
      })

      if (!userResp.data || Object.keys(userResp.data).length === 0) {
        return response.notFound({ error: 'No se encontró el usuario en el microservicio de seguridad' })
      }

      const administrator = await Administrator.create({
        ...payload,
        user_id: body.user_id,
      })

      return administrator
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // PUT /administrators/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AdministratorValidator)
      const body = request.body()

      const token = request.headers().authorization || ''
      const userResp = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.user_id}`, {
        headers: { Authorization: token },
      })

      if (!userResp.data || Object.keys(userResp.data).length === 0) {
        return response.notFound({ error: 'Usuario no encontrado en microservicio de seguridad' })
      }

      const administrator = await Administrator.findOrFail(params.id)
      administrator.user_id = payload.user_id
      administrator.type = payload.type
      administrator.phone = payload.phone
      return await administrator.save()
    } catch (error: any) {
      if (error.messages) return response.badRequest({ errors: error.messages.errors })
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // DELETE /administrators/:id
  public async delete({ params, response }: HttpContextContract) {
    const administrator = await Administrator.findOrFail(params.id)
    await administrator.delete()
    response.status(204)
    return
  }
}
