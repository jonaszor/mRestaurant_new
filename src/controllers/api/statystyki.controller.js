const {Pracownik, PracownikSchema} = require('../../models/Pracownik.js');
const {Dostawa, DostawaSchema} = require('../../models/Dostawa.js');
const {Dzien, DzienSchema} = require('../../models/Dzien.js');
const {Inwentarz, InwentarzSchema} = require('../../models/Inwentarz.js');
const {Magazyn, MagazynSchema} = require('../../models/Magazyn.js');
const {PolProdukt, PolProduktSchema} = require('../../models/PolProdukt.js');
const {Produkt, ProduktSchema} = require('../../models/Produkt.js');
const {Sprzedaz, SprzedazSchema} = require('../../models/Sprzedaz.js');
const {Straty, StratySchema} = require('../../models/Straty.js');

const utils = require('../../utils/newData.js');

const calculateStats = async (__actualDay) => {
    let dzien = await Dzien.findById({_id: __actualDay}).populate(['straty', 'sprzedaz', 'inwentarz', 'polProdukty']).populate({
        path : 'sprzedaz',
        populate : {
          path : 'Produkty'
        }
      }).populate({
        path : 'straty',
        populate : {
          path : 'polProdukty'
        }
      }).populate({
        path : 'straty',
        populate : {
          path : 'Produkty'
        }
      }).populate({
        path : 'straty',
        populate : {
          path : 'Produkty',
          populate: 'polProdukty'
        }
      }).populate({
        path : 'inwentarz',
        populate : {
          path : 'polProdukty'
        }
      });
    let dzienName = dzien.name;

    let dzienNameSplited = dzienName.split('/');
    let prevDayNumber = parseInt(dzienName.split('/')[1]);
    --prevDayNumber;
    if(prevDayNumber < 10)
        prevDayNumber = '0' + prevDayNumber;
    let prevDzienName = `${dzienNameSplited[0]}/${prevDayNumber}/${dzienNameSplited[2]}`;
    if(prevDzienName < 10)
      prevDzienName = '0' + prevDzienName;
    

    let dostawa = await Dostawa.findOne({name: dzienName});
    let prevDayInwentarz = await Inwentarz.findOne({name: prevDzienName}).populate('polProdukty');
    if(!prevDayInwentarz){
        //console.log(prevDzienName);
        return null;
    }
      

    /*
        Inwentarz dnia poprzedniego na sztuki
    */
    let polProdukty = prevDayInwentarz.polProdukty;
    let prevDayInwentarzSum = new Map();

    for(let i = 0; i < polProdukty.length; i++){
        let temp = (prevDayInwentarz.pPAmountJG[i] * polProdukty[i].multiplayerSubToMain * polProdukty[i].multiplayerUnitToSub) + (prevDayInwentarz.pPAmountPJ[i] * polProdukty[i].multiplayerUnitToSub) + prevDayInwentarz.pPAmountJ[i];
        prevDayInwentarzSum.set(polProdukty[i].id, temp);
    }
    
    /*
        Inwentarz dnia poprzedniego - Sprzedaż dnia aktualnego 
    */
    let i = 0;
    for(let produkt of dzien.sprzedaz.Produkty){
        let produktAmount = dzien.sprzedaz.ProduktyAmount[i];
        let j = 0;
        for(let polProdukt of produkt.polProdukty){
            let prevSum = prevDayInwentarzSum.get(polProdukt.toString());
            let addSum = produkt.amount[j] * produktAmount
            //console.log(`${produkt.name}  ${produktAmount} ${polProdukt.toString()} ${produkt.amount[j]} ${addSum}`)
            prevDayInwentarzSum.set(polProdukt.toString(), (prevSum - addSum));
            j++;
        }
        j=0
        i++;
    }
    
    /*
        Inwentarz dnia poprzedniego - Sprzedaż dnia aktualnego - Straty produktów dnia aktualnego
    */
    i = 0;

    for(let produkt of dzien.straty.Produkty){
        let produktAmount = produkt.amount[i];
        j=0;
        for(let polProdukt of produkt.polProdukty){
            if(!produktAmount)
                continue;
            //console.log(polProdukt.id.toString(), produkt.amount[j] , produktAmount);
            let prevSum = prevDayInwentarzSum.get(polProdukt.id.toString());
            //console.log(prevSum, produktAmount, produkt.amount[j])
            let addSum = produkt.amount[j] * produktAmount
            //console.log(prevSum, produkt.amount[j] , produktAmount)
            //console.log(`${produkt.name}  ${produktAmount} ${polProdukt.toString()} ${produkt.amount[j]} ${addSum}`)
            prevDayInwentarzSum.set(polProdukt.id.toString(), (prevSum - addSum));
            j++;
        }
        i++;
    }

    /*
        Inwentarz dnia poprzedniego - Sprzedaż dnia aktualnego - Straty produktów dnia aktualnego - Straty półproduktów dnia aktualnego
    */
    i = 0;
    for(let polProdukt of dzien.straty.polProdukty){
        //console.log(polProdukt);
        let addSum1 = dzien.straty.pPAmountJG[i] * polProdukt.multiplayerSubToMain * polProdukt.multiplayerUnitToSub;
        let addSum2 = dzien.straty.pPAmountPJ[i] * polProdukt.multiplayerUnitToSub;
        let addSum3 = dzien.straty.pPAmountJ[i]
        //console.log(addSum1, addSum2, addSum3       );

        let prevSum = prevDayInwentarzSum.get(polProdukt.id.toString());
        let addSum = addSum1 + addSum2 + addSum3;
        prevDayInwentarzSum.set(polProdukt.id.toString(), (prevSum + addSum));

        i++;
    }

    /* 
        Inwentarz dnia poprzedniego - Sprzedaż dnia aktualnego - Straty produktów dnia aktualnego - Straty półproduktów dnia aktualnego + Dostawa dnia aktualnego
    */
    if(dostawa){
        dostawa = await dostawa.populate('polProdukty');
        i = 0;j=0;
        for(let polProdukt of dostawa.polProdukty){
            let polProduktAmount = dostawa.pPAmountJG[i];
            let prevSum = prevDayInwentarzSum.get(polProdukt.id.toString());
            let addSum = polProdukt.multiplayerSubToMain * polProdukt.multiplayerUnitToSub * polProduktAmount;
            prevDayInwentarzSum.set(polProdukt.id.toString(), (prevSum +     addSum));
        }
    }
    
   //console.log(prevDayInwentarzSum);

    /*
        Inwentarz dnia aktualnego na sztuki
    */
    polProdukty = dzien.inwentarz.polProdukty;
    let actualDayInwentarzSum = new Map();

    for(let i = 0; i < polProdukty.length; i++){
        let temp = (dzien.inwentarz.pPAmountJG[i] * polProdukty[i].multiplayerSubToMain * polProdukty[i].multiplayerUnitToSub) + (dzien.inwentarz.pPAmountPJ[i] * polProdukty[i].multiplayerUnitToSub) + dzien.inwentarz.pPAmountJ[i];
        actualDayInwentarzSum.set(polProdukty[i].id, temp);
    }

    //console.log(actualDayInwentarzSum);

    //console.log(polProdukty);
    /* 
        Wynik inwentaryzacji
    */

    let newpolProdukty = [];
    
    for(let polProdukt of polProdukty){
        let prevSum = prevDayInwentarzSum.get(polProdukt.id.toString());
        let orgprevSum = prevSum;
        let prevpPAmountJG = Math.floor((prevSum / (polProdukt.multiplayerUnitToSub * polProdukt.multiplayerSubToMain)));
        prevSum = prevSum - (prevpPAmountJG * polProdukt.multiplayerUnitToSub * polProdukt.multiplayerSubToMain)
        let prevpPAmountPJ = Math.floor((prevSum / polProdukt.multiplayerUnitToSub));
        let prvpPAmountJ =  prevSum - (prevpPAmountPJ * polProdukt.multiplayerUnitToSub)

        
        let actualSum = actualDayInwentarzSum.get(polProdukt.id.toString());
        let orgactualSum = actualSum;
        let actualpPAmountJG = Math.floor((actualSum / (polProdukt.multiplayerUnitToSub * polProdukt.multiplayerSubToMain)));
        actualSum = actualSum - (actualpPAmountJG * polProdukt.multiplayerUnitToSub * polProdukt.multiplayerSubToMain)
        let actualpPAmountPJ = Math.floor((actualSum / polProdukt.multiplayerUnitToSub));
        let actualpPAmountJ =  actualSum - (actualpPAmountPJ * polProdukt.multiplayerUnitToSub)
    
        let deviation = orgactualSum - orgprevSum;
        newpolProdukty.push({
            id: polProdukt.id,
            name: polProdukt.name,
            unitMain: polProdukt.unitMain,
            unitSub: polProdukt.unitSub,
            unit: polProdukt.unit,
            multiplayerSubToMain: polProdukt.multiplayerSubToMain,
            multiplayerUnitToSub: polProdukt.multiplayerUnitToSub,
            magazyn: polProdukt.magazyn.toString(),
            prevDay: {
                'pPAmountJG': prevpPAmountJG,
                'pPAmountPJ': prevpPAmountPJ,
                'pPAmountJ': prvpPAmountJ
            },
            actualDay: {
                'pPAmountJG': actualpPAmountJG,
                'pPAmountPJ': actualpPAmountPJ,
                'pPAmountJ': actualpPAmountJ
            },
            deviation: deviation,
        })
    }

    //console.log(dzien)
    return newpolProdukty;
}

module.exports = {
    GET: async (req, res, next) => {
        let dni = await Dzien.find().sort({name: 'desc'});
        dni.shift();
        dni.pop();
        let newDni = [];
        let i = 0;
        for(let dzien of dni){
            //console.log(dzien)
            let stats = await calculateStats(dzien.id);
            if(!stats)
                continue;
            newDni.push({
                id: dzien.id,
                name: dzien.name, 
                comment: dzien.comment,
                straty: dzien.straty,
                sprzedaz: dzien.sprzedaz,
                inwentarz: dzien.inwentarz,
                typZatwierdzenia: dzien.typZatwierdzenia,
                polProdukty: dzien.polProdukty,
                usageAmount: dzien.usageAmount,
                stats: stats,
            })
            //dni[i].stats = await calculateStats(dzien.id);
            //i++;
        }
        
        res.json(newDni)
    },
    GET_SINGLE: async (req, res, next) => {
        res.json(await calculateStats(req.params.param1));
    },
}
