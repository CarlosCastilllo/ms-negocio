import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Gp from "App/Models/Gp";
import GpValidator from "App/Validators/GpValidator";
import { Exception } from "@adonisjs/core/build/standalone";

export default class GpsController {
  // GET /gps o /gps/:id
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const gp = await Gp.findOrFail(params.id);
        return gp;
      }

      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Gp.query().paginate(page, perPage);
      } else {
        return await Gp.query();
      }
    } catch (error: any) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }

  // POST /gps
  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GpValidator);

      const gp = await Gp.create({
        latitude: payload.latitude,
        longitude: payload.longitude,
        altitude: payload.altitude,
        accuracy: payload.accuracy,
        timestamp: payload.timestamp,
      });

      return gp;
    } catch (error: any) {
      if (error.messages)
        return response.badRequest({ errors: error.messages.errors });
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }

  // PUT /gps/:id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GpValidator);
      const gp = await Gp.findOrFail(params.id);

      gp.latitude = payload.latitude ?? gp.latitude;
      gp.longitude = payload.longitude ?? gp.longitude;
      gp.altitude = payload.altitude ?? gp.altitude;
      gp.accuracy = payload.accuracy ?? gp.accuracy;
      gp.timestamp = payload.timestamp ?? gp.timestamp;

      return await gp.save();
    } catch (error: any) {
      if (error.messages)
        return response.badRequest({ errors: error.messages.errors });
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }

  // DELETE /gps/:id
  public async delete({ params, response }: HttpContextContract) {
    try {
      const gp = await Gp.findOrFail(params.id);
      await gp.delete();
      response.status(204);
      return;
    } catch (error: any) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }
}
