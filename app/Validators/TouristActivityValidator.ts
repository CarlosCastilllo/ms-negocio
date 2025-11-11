import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TouristActivityValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required(), rules.maxLength(100)]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(300)]),
    location: schema.string({ trim: true }, [rules.required(), rules.maxLength(100)]),
    date: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    price: schema.number([rules.required(), rules.range(0, 10000000)]),
    plan_id: schema.number([rules.required()]),
  })

  public messages = {
    'name.required': 'El nombre de la actividad es obligatorio.',
    'plan_id.required': 'Debe estar asociada a un plan.',
  }
}
