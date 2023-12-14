const {Sprzedaz, SprzedazSchema} = require('../../models/Sprzedaz.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Sprzedaz.find().sort({name: 'desc'}))
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Sprzedaz.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const sprzedaz = await Sprzedaz.create(req.body)
            await sprzedaz.save();
            res.send(sprzedaz)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const sprzedaz = await Sprzedaz.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(sprzedaz)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const sprzedaz = await Sprzedaz.findOneAndRemove({_id: req.params.param1})
            if(!sprzedaz)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(sprzedaz)
        }catch(error){
            res.status(400).send(error)
        }
    },
}