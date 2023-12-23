const { validationResult } = require('express-validator');
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const Visit = require('../models/visit');
const db = require('../util/database');
const { route } = require('../routes/auth');
const process = require('node:process');


exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.sendEmail = async (req, res, next) => {
  // Configure API key authorization: api-key
  const api_key = process.env.API_KEY
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = api_key;

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [{
      email: `${email}`,
      name: `${firstName  +" "+  lastName}`
    }],
    params: {
      name: 'GHABI',
      surname: 'ANIS'
    },
    headers: {
      'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
    }
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + data);
  }, function (error) {
    console.error(error);
  });
}


exports.schules = async (req, res) => {
  try {
    const query = 'SELECT * FROM schuler';
    const result = await db.query(query);
    return res.json({ data: result[0] });
  } catch (err) { 
    res.status(500).send('Server error');
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id
  const resp = await db.execute(`SELECT * FROM schuler where id = ${id}`,
  );
  res.send(resp);
}


exports.CountSchules = async (req, res, next) => {
  try {
    const query = 'SELECT COUNT(*) FROM schuler';
    const result = await db.query(query);
    return res.json({ data: result[0] });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.createSchule= async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const repetation = req.body.repetation;
    const userId = req.body.userId
    db.execute(
      'INSERT INTO schuler (title,description, date, repetation,userId) VALUES (?, ?, ?, ?,?)',
      [title,description, date, repetation,userId]
    );
    res.send(req.body);
  } catch (err) {
    res.status(500).send('Server error', error.message);
  }
}

exports.updateSchule = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const repetation = req.body.repetation;
    const userId = req.body.userId
  const id = req.params.id
  db.execute(`UPDATE schuler SET title="${title}",description="${description}",date="${date}",repetation="${repetation}",userId="${userId}" where id = ${id}`,
  );
  res.send(req.body)
}

exports.deleteSchule = async (req, res) => {
  const id = req.params.id
  db.execute(`DELETE FROM schuler where id = ${id}`,
  );
  res.send(req.body)
}


/**  
* patient  api 
* this the express api for the patient 
*/

exports.patiens = async (req, res) => {
  try {
    const query = 'SELECT * FROM patient';
    const result = await db.query(query);
    return res.json({ data: result[0] });
  } catch (err) { 
    res.status(500).send('Server error');
  }
}

exports.findOnePatient = async (req, res) => {
  const id = req.params.id
  const resp = await db.execute(`SELECT * FROM patient where id = ${id}`,
  );
  res.send(resp);
}


exports.countPatient = async (req, res, next) => {
  try {
    const query = 'SELECT COUNT(*) FROM patient';
    const result = await db.query(query);
    return res.json({ data: result[0] });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.createPatient= async (req, res) => {
  try {
    console.log(req.body);
    const blood = req.body.blood;
    const sugar = req.body.sugar;
    const heartbeats = req.body.heartbeats;
    const breath = req.body.breath;
    const finalStatus = req.body.finalStatus;
    const mapPostition = req.body.mapPostition
    const date = req.body.date
    const userId = req.body.userId

    db.execute(
      'INSERT INTO patient (blood,sugar, heartbeats, breath,finalStatus,mapPostition,date,userId) VALUES (?, ?, ?, ?,?,?,?,?)',
      [blood,sugar, heartbeats, breath,finalStatus,mapPostition,date,userId]
    );
    res.send(req.body);
  } catch (err) {
    res.status(500).send('Server error', error.message);
  }
}

exports.updatePatient = async (req, res) => {
  const blood = req.body.blood;
  const sugar = req.body.sugar;
  const heartbeats = req.body.heartbeats;
  const breath = req.body.breath;
  const finalStatus = req.body.finalStatus;
  const mapPostition = req.body.mapPostition
  const date = req.body.date
  const userId = req.body.userId
  const id = req.params.id
  db.execute(`UPDATE patient SET blood="${blood}",sugar="${sugar}",heartbeats="${heartbeats}",breath="${breath}",finalStatus="${finalStatus}",mapPostition="${mapPostition}",date="${date}",userId="${userId}" where id = ${id}`,
  );
  res.send(req.body)
}

exports.deletePatient = async (req, res) => {
  const id = req.params.id
  db.execute(`DELETE FROM patient where id = ${id}`,
  );
  res.send(req.body)
}
