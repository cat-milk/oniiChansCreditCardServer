import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ValidationRuntimeOptions, CustomMessages } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

var valid = require("card-validator");
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/


export default class ExtendValidationProvider {
    constructor (protected app: ApplicationContract) {
    }


    private readonly validCreditCard = (
        value: string, 
        compiledOptions: any, 
        runtimeOptions: ValidationRuntimeOptions
    ):void => {

        //skip validation if value is not defined. the `required` rule should take care of it.
            if (value) {
                value = value.replace(/\D/g,'')
                console.log(value);
                const numberValidation = valid.number(value);

                if (!numberValidation.isValid){
                    throw {flashToSession:false, message:`Card Number Invalid`}
                }
            }

    };  

    public register () {
        // Register your own bindings
        const Validator = Application.container.use('Adonis/Core/Validator')
        Validator.validator.rule('creditCard', this.validCreditCard, );
        Validator.validator.addType('creditCard', ['string'] );
    }

    public async boot () {
        // All bindings are ready, feel free to use them
    }

    public async ready () {
        // App is ready
    }

    public async shutdown () {
        // Cleanup, since app is going down
    }
}
