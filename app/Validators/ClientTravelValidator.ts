import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ClientTravelValidator {
  public schema = schema.create({
    travel_id: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),

    client_id: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
  })

  public messages = {
    'travel_id.required': 'Debe especificar el viaje',
    'travel_id.exists': 'El viaje indicado no existe en la base de datos',

    'client_id.required': 'Debe especificar el cliente',
    'client_id.exists': 'El cliente indicado no existe en la base de datos',
  }
}
