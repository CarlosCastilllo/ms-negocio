import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class BillValidator {
  public schema = schema.create({
    state: schema.enum(['pendiente', 'pagada', 'cancelada'] as const),

    share_id: schema.number([
      rules.exists({ table: 'shares', column: 'id' }),
    ]),

    bank_card_id: schema.number([
      rules.exists({ table: 'bank_cards', column: 'id' }),
    ]),
  })

  public messages = {
    'state.required': 'El estado de la factura es obligatorio',
    'state.enum': 'El estado debe ser uno de: pendiente, pagada o cancelada',

    'share_id.required': 'Debe especificar la participación asociada',
    'share_id.exists': 'La participación indicada no existe en la base de datos',

    'bank_card_id.required': 'Debe especificar la tarjeta bancaria asociada',
    'bank_card_id.exists': 'La tarjeta bancaria indicada no existe en la base de datos',
  }
}
