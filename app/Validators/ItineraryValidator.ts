import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ItineraryValidator {
  public schema = schema.create({
    order: schema.number([
      rules.range(1, 1000), // número de orden entre 1 y 1000 (ajustable)
    ]),

    travel_id: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),

    journey_id: schema.number([
      rules.exists({ table: 'journeys', column: 'id' }),
    ]),

    transport_service_id: schema.number([
      rules.exists({ table: 'transport_services', column: 'id' }),
    ]),
  })

  public messages = {
    'order.required': 'El número de orden es obligatorio',
    'order.range': 'El orden debe estar entre 1 y 1000',

    'travel_id.required': 'Debe especificar el viaje asociado',
    'travel_id.exists': 'El viaje indicado no existe en la base de datos',

    'journey_id.required': 'Debe especificar el trayecto asociado',
    'journey_id.exists': 'El trayecto indicado no existe en la base de datos',

    'transport_service_id.required': 'Debe especificar el servicio de transporte',
    'transport_service_id.exists': 'El servicio de transporte indicado no existe en la base de datos',
  }
}
