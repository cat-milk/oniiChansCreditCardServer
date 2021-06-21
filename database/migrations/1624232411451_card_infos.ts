import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CardInfos extends BaseSchema {
  protected tableName = 'card_info'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 255).notNullable()
      table.string('card_number', 19).notNullable()
      table.dateTime('expiry_date').notNullable()
      table.string('ccv', 4).notNullable()

      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
