const router = require('express').Router();
const dostawaController = require('../controllers/api/dostawa.controller');
const dzienController = require('../controllers/api/dzien.controller');
const inwentarzController = require('../controllers/api/inwentarz.controller');
const magazynController = require('../controllers/api/magazyn.controller');
const polproduktController = require('../controllers/api/polprodukt.controller');
const pracownikController = require('../controllers/api/pracownik.controller');
const produktController = require('../controllers/api/produkt.controller');
const sprzedazController = require('../controllers/api/sprzedaz.controller');
const stratyController = require('../controllers/api/straty.controller');

/**
 * DOSTAWA
 */
router.get('/dostawa', dostawaController.GET)
router.get('/dostawa/:param1', dostawaController.GET_SINGLE)
router.post('/dostawa', dostawaController.POST)
router.put('/dostawa/:param1', dostawaController.PUT)
router.delete('/dostawa/:param1', dostawaController.DELETE)

/**
 * DZIEN
 */
router.get('/dzien', dzienController.GET)
router.get('/dzien/:param1', dzienController.GET_SINGLE)
router.post('/dzien', dzienController.POST)
router.put('/dzien/:param1', dzienController.PUT)
router.delete('/dzien/:param1', dzienController.DELETE)

/**
 * INWENTARZ
 */
router.get('/inwentarz', inwentarzController.GET)
router.get('/inwentarz/:param1', inwentarzController.GET_SINGLE)
router.post('/inwentarz', inwentarzController.POST)
router.put('/inwentarz/:param1', inwentarzController.PUT)
router.delete('/inwentarz/:param1', inwentarzController.DELETE)

/**
 * MAGAZYN
 */
router.get('/magazyn', magazynController.GET)
router.get('/magazyn/:param1', magazynController.GET_SINGLE)
router.post('/magazyn', magazynController.POST)
router.put('/magazyn/:param1', magazynController.PUT)
router.delete('/magazyn/:param1', magazynController.DELETE)

/**
 * POLPRODUKT
 */
router.get('/polprodukt', polproduktController.GET)
router.get('/polprodukt/:param1', polproduktController.GET_SINGLE)
router.post('/polprodukt', polproduktController.POST)
router.put('/polprodukt/:param1', polproduktController.PUT)
router.delete('/polprodukt/:param1', polproduktController.DELETE)

/**
 * PRACOWNIK
 */
router.get('/pracownik', pracownikController.GET)
router.get('/pracownik/:param1', pracownikController.GET_SINGLE)
router.post('/pracownik', pracownikController.POST)
router.put('/pracownik/:param1', pracownikController.PUT)
router.delete('/pracownik/:param1', pracownikController.DELETE)

/**
 * PRODUKT
 */
router.get('/produkt', produktController.GET)
router.get('/produkt/:param1', produktController.GET_SINGLE)
router.post('/produkt', produktController.POST)
router.put('/produkt/:param1', produktController.PUT)
router.delete('/produkt/:param1', produktController.DELETE)

/**
 * SPRZEDAZ
 */
router.get('/sprzedaz', sprzedazController.GET)
router.get('/sprzedaz/:param1', sprzedazController.GET_SINGLE)
router.post('/sprzedaz', sprzedazController.POST)
router.put('/sprzedaz/:param1', sprzedazController.PUT)
router.delete('/sprzedaz/:param1', sprzedazController.DELETE)

/**
 * STRATY
 */
router.get('/straty', stratyController.GET)
router.get('/straty/:param1', stratyController.GET_SINGLE)
router.post('/straty', stratyController.POST)
router.put('/straty/:param1', stratyController.PUT)
router.delete('/straty/:param1', stratyController.DELETE)



module.exports = router;