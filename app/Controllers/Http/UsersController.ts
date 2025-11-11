// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// app/Controllers/Http/UsersController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'
import { Exception } from '@adonisjs/core/build/standalone'

export default class UsersController {
  // GET /users or /users/:id
  public async find({ request, params, response }: HttpContextContract) {
    try {
      const token = request.headers().authorization || ''
      const base = Env.get('MS_SECURITY')

      if (params.id) {
        // Obtener usuario por id desde MS_SECURITY
        const resp = await axios.get(`${base}/api/users/${params.id}`, {
          headers: { Authorization: token },
        })
        if (!resp.data) return response.notFound({ error: 'User not found in MS_SECURITY' })
        return resp.data
      }

      // Listado (soporta paginación -> reenvía query params)
      const query = request.qs()
      const resp = await axios.get(`${base}/api/users`, {
        params: query,
        headers: { Authorization: token },
      })
      return resp.data
    } catch (error: any) {
      // Manejo y mapeo de errores de axios
      if (error.response) {
        const status = error.response.status || 500
        const data = error.response.data || { error: error.message }
        // Passthrough de errores del microservicio de seguridad
        return response.status(status).send(data)
      }
      throw new Exception(error.message || 'Error contacting MS_SECURITY', error.status || 500)
    }
  }

  // POST /users
  public async create({ request, response }: HttpContextContract) {
    try {
      const token = request.headers().authorization || ''
      const base = Env.get('MS_SECURITY')
      const body = request.body()

      const resp = await axios.post(`${base}/api/users`, body, {
        headers: { Authorization: token },
      })

      return response.status(resp.status).send(resp.data)
    } catch (error: any) {
      if (error.response) {
        return response.status(error.response.status).send(error.response.data)
      }
      throw new Exception(error.message || 'Error contacting MS_SECURITY', error.status || 500)
    }
  }

  // PUT /users/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const token = request.headers().authorization || ''
      const base = Env.get('MS_SECURITY')
      const body = request.body()

      const resp = await axios.put(`${base}/api/users/${params.id}`, body, {
        headers: { Authorization: token },
      })

      return response.status(resp.status).send(resp.data)
    } catch (error: any) {
      if (error.response) {
        return response.status(error.response.status).send(error.response.data)
      }
      throw new Exception(error.message || 'Error contacting MS_SECURITY', error.status || 500)
    }
  }

  // DELETE /users/:id
  public async delete({ params, response, request }: HttpContextContract) {
    try {
      const token = request.headers().authorization || ''
      const base = Env.get('MS_SECURITY')

      const resp = await axios.delete(`${base}/api/users/${params.id}`, {
        headers: { Authorization: token },
      })

      return response.status(resp.status).send(resp.data || null)
    } catch (error: any) {
      if (error.response) {
        return response.status(error.response.status).send(error.response.data)
      }
      throw new Exception(error.message || 'Error contacting MS_SECURITY', error.status || 500)
    }
  }
}

