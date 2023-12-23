const express = require('express');

const { body } = require('express-validator');

const adminManagementController = require('../controllers/adminManagement');

const auth = require('../middleware/auth');

const router = express.Router();

// router.get('/', auth, adminManagementController.fetchAll);
router.get('/schules', adminManagementController.schules);
router.get('/count', adminManagementController.CountSchules);
router.post('/createSchule', adminManagementController.createSchule);
router.put('/updateSchule/:id', adminManagementController.updateSchule);
router.delete('/deleteSchule/:id', adminManagementController.deleteSchule);
router.get('/findOne/:id', adminManagementController.findOne);


/** patients routes */
router.get('/patiens', adminManagementController.patiens);
router.get('/countPatiens', adminManagementController.countPatient);
router.post('/createPatient', adminManagementController.createPatient);
router.put('/updatePatient/:id', adminManagementController.updatePatient);
router.delete('/deletePatient/:id', adminManagementController.deletePatient);
router.get('/findOnePatient/:id', adminManagementController.findOnePatient);


module.exports = router;