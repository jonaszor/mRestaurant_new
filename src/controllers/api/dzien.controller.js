const {Dzien, DzienSchema} = require('../../models/Dzien.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Dzien.find())
        //res.render('account/login', { });
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Dzien.findById(req.params.param1))
        //res.render('account/login', { });
    },
    POST: async (req, res, next) => {
        try{
            const dzien = await Dzien.create(req.body)
            await dzien.save();
            res.send(dzien)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const dzien = await Dzien.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(dzien)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async(req, res, next) => {
        try{
            const dzien = await Dzien.findOneAndRemove({_id: req.params.param1})
            if(!dzien)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(dzien)
        }catch(error){
            res.status(400).send(error)
        }
    },
}

/*
const DzienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    comment: {
        type: String,
        default: "brak"
    },
    straty: {
        type: Schema.Types.ObjectId,
        ref: 'Straty'
    },
    sprzedaz: {
        type: Schema.Types.ObjectId,
        ref: 'Sprzedaz'
    },
    inwentarz: {
        type: Schema.Types.ObjectId,
        ref: 'Inwentarz'
    },
    typZatwierdzenia: {
        type: String,
        default: "Brak"
    },
    polProdukty: {
        type: [Schema.Types.ObjectId],
        ref: 'PolProdukt',
        default: []
    },
    usageAmount: {
        type: [Number],
        default: []
    },
});*/