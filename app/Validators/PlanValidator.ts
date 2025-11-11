import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PlanValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required()]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
    price: schema.number([rules.required(), rules.range(0, 10000000)]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    end_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    hotel_id: schema.number([rules.required()]),
    guide_id: schema.number([rules.required()]),
    car_id: schema.number([rules.required()]),
    administrator_id: schema.number([rules.required()]),
  })

  public messages = {
    'name.required': 'El nombre del plan es obligatorio.',
    'start_date.required': 'La fecha de inicio es obligatoria.',
    'end_date.required': 'La fecha de fin es obligatoria.',
  }
}
