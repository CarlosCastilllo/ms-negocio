import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TravelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),

    end_date: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),

    price: schema.number([
      rules.range(0, 10000000), // precio entre 0 y 10 millones (ajustable)
    ]),
  })

  public messages = {
    'start_date.required': 'La fecha de inicio del viaje es obligatoria',
    'start_date.date': 'La fecha de inicio debe tener el formato YYYY-MM-DD HH:mm:ss',

    'end_date.required': 'La fecha de finalización del viaje es obligatoria',
    'end_date.date': 'La fecha de finalización debe tener el formato YYYY-MM-DD HH:mm:ss',

    'price.required': 'El precio del viaje es obligatorio',
    'price.range': 'El precio debe estar entre 0 y 10,000,000',
  }

  /**
   * Validación adicional: comprobar que la fecha de inicio sea anterior a la de fin.
   */
  public async validateExtra(data: any) {
    if (data.start_date >= data.end_date) {
      throw new Error('La fecha de inicio debe ser anterior a la fecha de finalización')
    }
  }
}
