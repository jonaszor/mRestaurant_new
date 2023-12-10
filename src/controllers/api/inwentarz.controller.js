const {Inwentarz, InwentarzSchema} = require('../../models/Inwentarz.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Inwentarz.find().populate('polProdukty'))
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Inwentarz.findById(req.params.param1).populate('polProdukty'))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const inwentarz = await Inwentarz.create(req.body)
            await inwentarz.save();
            res.send(inwentarz)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const inwentarz = await Inwentarz.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(inwentarz)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const inwentarz = await Inwentarz.findOneAndRemove({_id: req.params.param1})
            if(!inwentarz)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(inwentarz)
        }catch(error){
            res.status(400).send(error)
        }
    },
}