import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JourneyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    origin: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),

    destination: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),

    distance: schema.number([
      rules.range(1, 100000), // entre 1 y 100000 km
    ]),

    duration: schema.number([
      rules.range(1, 1000), // ajusta según tu unidad de medida
    ]),
  })

  public messages = {
    'origin.required': 'El municipio de origen es obligatorio',
    'origin.exists': 'El municipio de origen no existe en la base de datos',

    'destination.required': 'El municipio de destino es obligatorio',
    'destination.exists': 'El municipio de destino no existe en la base de datos',

    'distance.required': 'La distancia es obligatoria',
    'distance.range': 'La distancia debe estar entre 1 y 100000',

    'duration.required': 'La duración es obligatoria',
    'duration.range': 'La duración debe estar entre 1 y 1000 unidades de tiempo',
  }

  /**
   * Validación adicional manual: evitar que origen y destino sean iguales.
   */
  public async validateExtra(data: any) {
    if (data.origin === data.destination) {
      throw new Error('El origen y el destino no pueden ser el mismo municipio')
    }
  }
}
