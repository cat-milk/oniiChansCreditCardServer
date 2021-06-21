import { DateTime } from 'luxon'
import { BaseModel, column, } from '@ioc:Adonis/Lucid/Orm'

export default class CardInfo extends BaseModel {
    public static table = 'card_info'

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public cardNumber: string
    
    @column()
    public expiryDate: DateTime

    @column()
    public ccv: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
