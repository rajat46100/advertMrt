const mongoose = require('mongoose');
const SwaggerDoc = require('./swagger');

const { ErrorHandler } = require('../utils');

class BaseModel {
  constructor() {
    this.schema = new mongoose.Schema(this.constructor.getSchema());
    this.model = mongoose.model(this.constructor.getModelName(), this.schema);

    SwaggerDoc.definitions = { ...SwaggerDoc.definitions, [this.constructor.getModelName()]: this.schema.jsonSchema() };
  }

  find(query) {
    return this.model.find(query).lean(true);
  }

  findOne(query) {
    return this.model.findOne(query).lean(true);
  }

  create(data) {
    return this.model.create(data);
  }

  async update(query, data) {
    const modified = await this.model.updateOne(query, data).lean();
    if (modified.ok == 1) {
      const user = await this.findOne(query);
      return user;
    } else throw ErrorHandler.DbError('Failed to update');
  }

  async findOneOrCreate(query, data) {
    let record = await this.findOne(query);
    if (!record) {
      record = (await this.create(data))._doc;
    }
    return record;
  }
}

module.exports = BaseModel;
