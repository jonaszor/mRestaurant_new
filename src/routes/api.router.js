const router = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/api/auth.controller');
const dostawaController = require('../controllers/api/dostawa.controller');
const dzienController = require('../controllers/api/dzien.controller');
const inwentarzController = require('../controllers/api/inwentarz.controller');
const magazynController = require('../controllers/api/magazyn.controller');
const polproduktController = require('../controllers/api/polprodukt.controller');
const pracownikController = require('../controllers/api/pracownik.controller');
const produktController = require('../controllers/api/produkt.controller');
const sprzedazController = require('../controllers/api/sprzedaz.controller');
const stratyController = require('../controllers/api/straty.controller');

const authMiddleware = require('../config/passport/auth');

/**
 * AUTH
 */
router.get('/login', authController.LOGIN)
router.get('/register', authController.REGISTER)

/**
 * DOSTAWA
 */
router.get('/dostawa', passport.authenticate('jwt', { session: false }), dostawaController.GET)
router.get('/dostawa/:param1', passport.authenticate('jwt', { session: false }), dostawaController.GET_SINGLE)
router.post('/dostawa', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dostawaController.POST)
router.put('/dostawa/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dostawaController.PUT)
router.delete('/dostawa/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dostawaController.DELETE)

/**
 * DZIEN
 */
router.get('/dzien', passport.authenticate('jwt', { session: false }), dzienController.GET)
router.get('/dzien/:param1', passport.authenticate('jwt', { session: false }), dzienController.GET_SINGLE)
router.post('/dzien', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dzienController.POST)
router.put('/dzien/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dzienController.PUT)
router.delete('/dzien/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, dzienController.DELETE)

/**
 * INWENTARZ
 */
router.get('/inwentarz', passport.authenticate('jwt', { session: false }), inwentarzController.GET)
router.get('/inwentarz/:param1', passport.authenticate('jwt', { session: false }), inwentarzController.GET_SINGLE)
router.post('/inwentarz', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, inwentarzController.POST)
router.put('/inwentarz/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, inwentarzController.PUT)
router.delete('/inwentarz/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, inwentarzController.DELETE)

/**
 * MAGAZYN
 */
router.get('/magazyn', passport.authenticate('jwt', { session: false }), magazynController.GET)
router.get('/magazyn/:param1', passport.authenticate('jwt', { session: false }), magazynController.GET_SINGLE)
router.post('/magazyn', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, magazynController.POST)
router.put('/magazyn/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, magazynController.PUT)
router.delete('/magazyn/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, magazynController.DELETE)

/**
 * POLPRODUKT
 */
router.get('/polprodukt', passport.authenticate('jwt', { session: false }), polproduktController.GET)
router.get('/polprodukt/:param1', passport.authenticate('jwt', { session: false }), polproduktController.GET_SINGLE)
router.post('/polprodukt', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, polproduktController.POST)
router.put('/polprodukt/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, polproduktController.PUT)
router.delete('/polprodukt/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, polproduktController.DELETE)

/**
 * PRACOWNIK
 */
router.get('/pracownik', passport.authenticate('jwt', { session: false }), pracownikController.GET)
router.get('/pracownik/:param1', passport.authenticate('jwt', { session: false }), pracownikController.GET_SINGLE)
router.post('/pracownik', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, pracownikController.POST)
router.put('/pracownik/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, pracownikController.PUT)
router.delete('/pracownik/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, pracownikController.DELETE)

/**
 * PRODUKT
 */
router.get('/produkt', passport.authenticate('jwt', { session: false }), produktController.GET)
router.get('/produkt/:param1', passport.authenticate('jwt', { session: false }), produktController.GET_SINGLE)
router.post('/produkt', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, produktController.POST)
router.put('/produkt/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, produktController.PUT)
router.delete('/produkt/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, produktController.DELETE)

/**
 * SPRZEDAZ
 */
router.get('/sprzedaz', passport.authenticate('jwt', { session: false }), sprzedazController.GET)
router.get('/sprzedaz/:param1', passport.authenticate('jwt', { session: false }), sprzedazController.GET_SINGLE)
router.post('/sprzedaz', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, sprzedazController.POST)
router.put('/sprzedaz/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, sprzedazController.PUT)
router.delete('/sprzedaz/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, sprzedazController.DELETE)

/**
 * STRATY
 */
router.get('/straty', passport.authenticate('jwt', { session: false }), stratyController.GET)
router.get('/straty/:param1', passport.authenticate('jwt', { session: false }), stratyController.GET_SINGLE)
router.post('/straty', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, stratyController.POST)
router.put('/straty/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, stratyController.PUT)
router.delete('/straty/:param1', passport.authenticate('jwt', { session: false }), authMiddleware.ensureIsKR, stratyController.DELETE)



module.exports = router;