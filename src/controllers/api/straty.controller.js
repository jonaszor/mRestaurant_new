const {Straty, StratySchema} = require('../../models/Straty.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Straty.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Straty.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const straty = await Straty.create(req.body)
            await straty.save();
            res.send(straty)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const straty = await Straty.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(straty)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const straty = await Straty.findOneAndRemove({_id: req.params.param1})
            if(!straty)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(straty)
        }catch(error){
            res.status(400).send(error)
        }
    },
}