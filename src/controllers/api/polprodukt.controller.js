const {PolProdukt, PolProduktSchema} = require('../../models/PolProdukt.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await PolProdukt.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await PolProdukt.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const polprodukt = await PolProdukt.create(req.body)
            await polprodukt.save();
            res.send(polprodukt)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const polprodukt = await PolProdukt.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(polprodukt)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const polprodukt = await PolProdukt.findOneAndRemove({_id: req.params.param1})
            if(!polprodukt)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(polprodukt)
        }catch(error){
            res.status(400).send(error)
        }
    },
}