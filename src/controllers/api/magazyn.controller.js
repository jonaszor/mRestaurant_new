const {Magazyn, MagazynSchema} = require('../../models/Magazyn.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Magazyn.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Magazyn.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const magazyn = await Magazyn.create(req.body)
            await magazyn.save();
            res.send(magazyn)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const magazyn = await Magazyn.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(magazyn)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const magazyn = await Magazyn.findOneAndRemove({_id: req.params.param1})
            if(!magazyn)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(magazyn)
        }catch(error){
            res.status(400).send(error)
        }
    },
}