import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransportServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),

    end: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),

    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // o la tabla que corresponda
    ]),

    journey_id: schema.number([
      rules.exists({ table: 'journeys', column: 'id' }),
    ]),
  })

  public messages = {
    'start.required': 'La fecha de inicio del servicio es obligatoria',
    'start.date': 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD HH:mm:ss)',

    'end.required': 'La fecha de finalización es obligatoria',
    'end.date': 'La fecha de finalización debe tener un formato válido (YYYY-MM-DD HH:mm:ss)',

    'vehicle_id.required': 'Debe especificar un vehículo válido',
    'vehicle_id.exists': 'El vehículo indicado no existe en la base de datos',

    'journey_id.required': 'Debe especificar un trayecto válido',
    'journey_id.exists': 'El trayecto indicado no existe en la base de datos',
  }

  /**
   * Validación adicional: verificar que la fecha de inicio sea anterior a la fecha de fin
   */
  public async validateExtra(data: any) {
    if (data.start >= data.end) {
      throw new Error('La fecha de inicio debe ser anterior a la fecha de fin del servicio')
    }
  }
}
