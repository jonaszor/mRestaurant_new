const {Dostawa, DostawaSchema} = require('../../models/Dostawa.js');

module.exports = {
    GET: async (req, res, next) => {
        res.json(await Dostawa.find().populate('polProdukty'))
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await Dostawa.findById(req.params.param1).populate('polProdukty'))
    },
    POST: async (req, res, next) => {
        try{
            const dostawa = await Dostawa.create(req.body)
            await dostawa.save();
            res.send(dostawa)
        }catch(error){
            res.status(400).send(error)
        }
    },
    PUT: async(req, res, next) => {
        try{
            const dostawa = await Dostawa.findOneAndUpdate({_id: req.params.param1}, req.body, {
                new: true
              });
            res.send(dostawa)
        }catch(error){
            res.status(400).send(error)
        }
    },
    DELETE: async (req, res, next) => {
        try{
            const dostawa = await Dostawa.findOneAndRemove({_id: req.params.param1})
            if(!dostawa)
                return res.status(400).send({"message": "Obiekt nie istnieje"})
            res.send(dostawa)
        }catch(error){
            res.status(400).send(error)
        }
    },
}

/*
const DostawaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    polProdukty: {
        type: [Schema.Types.ObjectId],
        ref: 'PolProdukt'
    },
    pPAmountJG:{
        type: [Number],
    },
    typZatwierdzenia: {
        type: String,
        default: "Brak"
    }
});
*/

