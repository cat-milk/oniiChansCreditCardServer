import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class CardInfoValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	
	public refs = schema.refs({
		allowedDate: DateTime.local().endOf('month')
	})

	public schema = schema.create({
		name: schema.string({},[
			rules.alpha({
				allow:['space']
			}),
		]),
		cardNumber: schema.string({},
			[
				rules.regex(/^(?=[0-9])[0-9 -]+$(?<=[0-9])/),
				rules.minLength(15),
				//rules.maxLength(19),
				rules.regex(/^(?:[- ]*\d[- ]*){1,19}$/), //this is the replacment for max length becuase we need to ignore space and '-' characters
				// @ts-ignore
				rules.creditCard()
			]
		),
		expiryDate: schema.date({},[
			rules.after(this.refs.allowedDate),
		]),
		ccv: schema.string({},[
			rules.minLength(3),
			rules.maxLength(4),
			rules.regex(/^[0-9]+$/),
		]),
	})

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	public messages = {}
}
