//import { ioc } from '@adonisjs/fold";
/* import standalone_1 from "@adonisjs/core/build/standalone"; */
import Application from '@ioc:Adonis/Core/Application'

const mcuCharacter = async (data, field, message, args, get) => {
    // get the character value
    const value = get(data, field);

    if (!value) {
    /**
     * skip validation if value is not defined. `required` rule
     * should take care of it.
     */
    return;
    }

    // validate the character
    const shortListOfMCUCharacters = [""];

    // if the character is not in the list, throw the validation error message
    if (!shortListOfMCUCharacters.includes(value.toLowerCase())){
        throw message ||
            `Nah, ${value} isn't part of the list as far as I am concerned`;
    }
};  
/* standalone_1.hooks
hooks.after.providersRegistered(() => {
    //const Validator = ioc.use("Validator");
    const Validator = Application.container.use("Validator")
    Validator.extend("mcuCharacter", mcuCharacter);
});


hooks.after.providersBooted(() => {

}) */