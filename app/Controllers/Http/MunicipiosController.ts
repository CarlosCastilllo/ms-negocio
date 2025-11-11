import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Municipio from "App/Models/Municipio";
import MunicipioValidator from "App/Validators/MunicipioValidator";
import axios from "axios";

export default class MunicipiosController {
  public async sincronizar() {
    const response = await axios.get("https://api-colombia.com/api/v1/City");

    for (const city of response.data) {
      await Municipio.updateOrCreate(
        { id: city.id },
        {
          name: city.name,
          description: city.description ?? "",
        },
      );
    }

    return { message: "Municipios sincronizados con datos completos." };
  }
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theMunicipio: Municipio = await Municipio.findOrFail(params.id);
      return theMunicipio;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Municipio.query().paginate(page, perPage);
      } else {
        return await Municipio.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(MunicipioValidator);
    const theMunicipio: Municipio = await Municipio.create(body);
    return theMunicipio;
  }

  public async update({ params, request }: HttpContextContract) {
    const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
    const body = request.body();
    theMunicipio.name = body.name;
    theMunicipio.description = body.description;
    return await theMunicipio.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
    response.status(204);
    return await theMunicipio.delete();
  }
}
