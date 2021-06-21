// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'


import CardInfo from "App/Models/CardInfo";
import CardInfoValidator from 'App/Validators/CardInfoValidator';

export default class CardsController {

    async saveCardInfo({response, request, params, session}){
        let body = request.body()
        console.log(body);

        /* 
        // @ts-ignore
        console.log(new CardInfoValidator().refs.allowedDate)
        */
        
        // @ts-ignore
        console.log(new CardInfoValidator().schema.tree.cardNumber.rules[1].compiledOptions)
        

        const payload = await request.validate(CardInfoValidator)
        
        let cardEntry = new CardInfo()
        cardEntry.fill({
            name:payload.name,
            cardNumber:payload.cardNumber,
            expiryDate:payload.expiryDate,
            ccv:payload.ccv,
        })
        await cardEntry.save()

        return response.send({success:true})
        
    }

}
