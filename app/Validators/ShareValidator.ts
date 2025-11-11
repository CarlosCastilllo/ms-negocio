import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ShareValidator {
  public schema = schema.create({
    cantity: schema.number([
      rules.range(1, 100000), // Cantidad mínima 1, máxima 100,000 (ajustable)
    ]),

    price: schema.number([
      rules.range(0, 10000000), // Precio mínimo 0, máximo 10 millones
    ]),

    travel_id: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
  })

  public messages = {
    'cantity.required': 'La cantidad es obligatoria',
    'cantity.range': 'La cantidad debe estar entre 1 y 100,000',

    'price.required': 'El precio es obligatorio',
    'price.range': 'El precio debe estar entre 0 y 10,000,000',

    'travel_id.required': 'Debe especificar el viaje asociado',
    'travel_id.exists': 'El viaje indicado no existe en la base de datos',
  }
}
