const {Pracownik, PracownikSchema} = require('../../models/Pracownik.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Pracownik.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Pracownik.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const pracownik = await Pracownik.create(req.body)
            await pracownik.save();
            res.send(pracownik)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const pracownik = await Pracownik.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(pracownik)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const pracownik = await Pracownik.findOneAndRemove({_id: req.params.param1})
            if(!pracownik)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(pracownik)
        }catch(error){
            res.status(400).send(error)
        }
    },
}