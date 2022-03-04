const express = require('express');
const router = express.Router();
const apartmentController = require('../app/controllers/ApartmentController');

router.post('/search', apartmentController.search);
// router.post('/add-new', apartmentController.addApartment);
router.get('/:slugName/check-order', apartmentController.checkOrder);
router.get('/sort/:value', apartmentController.showAllSort);
router.post('/:slugName/save-order', apartmentController.saveOrder);
router.post('/:slugName/add-feedback', apartmentController.addFeedback);
router.get('/:slugName/get-feedbacks', apartmentController.getFeedbacks);
router.get('/:slugName/related-products/:slugType', apartmentController.relatedProducts);
router.get('/types/:slugName', apartmentController.apartmentsOfType);
//router.get('/types/:slugName', apartmentController.typeDetail);
router.get('/types', apartmentController.types);
router.get('/all-count', apartmentController.allCount);
router.get('/:slugName', apartmentController.detail);
router.get('/', apartmentController.showAll);

module.exports = router;