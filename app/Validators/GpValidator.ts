import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    latitude: schema.number([
      rules.required(),
      rules.range(-90, 90), // Rango válido de latitud
    ]),

    longitude: schema.number([
      rules.required(),
      rules.range(-180, 180), // Rango válido de longitud
    ]),

    altitude: schema.number.optional([
      rules.range(0, 10000), // Altitud en metros (0 a 10,000 m)
    ]),

    accuracy: schema.number.optional([
      rules.range(0, 10000), // Precisión en metros
    ]),

    timestamp: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
  })

  public messages = {
    'latitude.required': 'La latitud es obligatoria',
    'latitude.range': 'La latitud debe estar entre -90 y 90',

    'longitude.required': 'La longitud es obligatoria',
    'longitude.range': 'La longitud debe estar entre -180 y 180',

    'altitude.range': 'La altitud debe estar entre 0 y 10,000 metros',

    'accuracy.range': 'La precisión debe estar entre 0 y 10,000 metros',

    'timestamp.required': 'La marca de tiempo es obligatoria',
    'timestamp.date': 'La marca de tiempo debe tener el formato YYYY-MM-DD HH:mm:ss',
  }
}
