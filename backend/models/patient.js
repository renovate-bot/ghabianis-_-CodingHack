const db = require('../util/database');

module.exports = class Absence {
  constructor(blood,sugar, heartbeats, breath,finalStatus,date,mapPostition,userId) {
    this.blood = blood;
    this.sugar = sugar;
    this.heartbeats = heartbeats;
    this.breath = breath;
    this.finalStatus = finalStatus;
    this.mapPostition = mapPostition;
    this.date = date;
    this.userId = userId;
  }
}