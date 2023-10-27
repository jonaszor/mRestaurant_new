const {Produkt, ProduktSchema} = require('../../models/Produkt.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Produkt.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Produkt.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const produkt = await Produkt.create(req.body)
            await produkt.save();
            res.send(produkt)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const produkt = await Produkt.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(produkt)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const produkt = await Produkt.findOneAndRemove({_id: req.params.param1})
            if(!produkt)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(produkt)
        }catch(error){
            res.status(400).send(error)
        }
    },
}