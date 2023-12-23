const db = require('../util/database');

module.exports = class Absence {
  constructor(title,description, date, repetation,userId) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.repetation = repetation;
    this.userId = userId
  }
}