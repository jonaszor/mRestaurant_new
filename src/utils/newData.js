const {Pracownik, PracownikSchema} = require('../models/Pracownik.js');
const {Dostawa, DostawaSchema} = require('../models/Dostawa.js');
const {Dzien, DzienSchema} = require('../models/Dzien.js');
const {Inwentarz, InwentarzSchema} = require('../models/Inwentarz.js');
const {Magazyn, MagazynSchema} = require('../models/Magazyn.js');
const {PolProdukt, PolProduktSchema} = require('../models/PolProdukt.js');
const {Produkt, ProduktSchema} = require('../models/Produkt.js');
const {Sprzedaz, SprzedazSchema} = require('../models/Sprzedaz.js');
const {Straty, StratySchema} = require('../models/Straty.js');

const moment = require('moment');

module.exports = {
    today: () => {
        return moment().format('MM/DD/YYYY');
    },
    addDay: async (name) => {
        try{
            let day = new Dzien({name: name});
            let inv = new Inwentarz({name: name});
            let sell = new Sprzedaz({name: name});
            let waste = new Straty({name: name});

            let pProducts = await PolProdukt.find();
            let pProductsIds = [];
            let pProductsAmount = [];

            for(let pProduct of pProducts){
                pProductsIds.push(pProduct.id);
                pProductsAmount.push(0);
            }

            day.straty = waste.id;
            day.inwentarz = inv.id;
            day.sprzedaz = sell.id;
            day.polProdukty = pProductsIds;
            day.usageAmount = pProductsAmount;

            inv.polProdukty = pProductsIds;
            inv.pPAmountJG = pProductsAmount;
            inv.pPAmountPJ = pProductsAmount;
            inv.pPAmountJ = pProductsAmount;

            let Products = await Produkt.find();
            let ProductsIds = [];
            let ProductsAmount = [];

            for(let Product of Products){
                ProductsIds.push(Product.id);
                ProductsAmount.push(0);
            }

            sell.Produkty = ProductsIds;
            sell.ProduktyAmount = ProductsAmount;

            waste.polProdukty = pProductsIds;
            waste.pPAmountJG = pProductsAmount;
            waste.pPAmountPJ = pProductsAmount;
            waste.pPAmountJ = pProductsAmount;
            waste.Produkty = ProductsIds;
            waste.ProduktyAmount = ProductsAmount;

            day = await day.save();
            inv = await inv.save();
            sell = await sell.save();
            waste = await waste.save();
            return {day, inv, sell, waste}
        }catch(error){
            console.log(error)
        } 
    },
    addSupply: async (name) => {
        try{
            let supply = new Dostawa({name: name});
            let pProducts = await PolProdukt.find();
            let pProductsIds = [];
            let pProductsAmount = [];

            for(let pProduct of pProducts){
                pProductsIds.push(pProduct.id);
                pProductsAmount.push(0);
            }

            supply.polProdukty = pProductsIds;
            supply.pPAmountJG = pProductsAmount;

            supply = supply.save();
            return supply;
        }catch(error){
            console.log(error)
        } 
    },
    editDay: async (name) => {
        try{
            let day = await Dzien.findOne({name: name});
            console.log(day);
            let pProducts = await PolProdukt.find();
            let pProductsIds = [];
            let pProductsAmount = [];

            for(let pProduct of pProducts){
                pProductsIds.push(pProduct.id);
                pProductsAmount.push(0);
            }

            day.polProdukty = pProductsIds;
            day.usageAmount = pProductsAmount;

            day = day.save();
            return day;
        }catch(error){
            console.log(error)
        } 
    }
}
