var mongoose=require("mongoose");
var Mekan=mongoose.model("mekan");

const cevapOlustur=function(res,status,content){
    res.status(status).json(content);
}

var cevrimler=(function(){
    var dunyaYaricap=6371; //km
    var radyan2Kilometre=function(radyan){
        return parseFloat(radyan*dunyaYaricap);
    };
    var kilometre2Radyan=function(mesafe){
        return parseFloat(mesafe/dunyaYaricap);
    };
    return{
        radyan2Kilometre: radyan2Kilometre,
        kilometre2Radyan: kilometre2Radyan,
    };
})();

const mekanlariListele=async(req,res)=>{
    var boylam=parseFloat(req.query.boylam);
    var enlem=parseFloat(req.query.enlem);
    var koordinat={
        type:"Point",
        coordinates: [enlem,boylam],
    };
    var geoOptions={
        distanceField:"mesafe",
        spherical:true,
    };
    if((!enlem && boylam !==0) || (!enlem && boylam !==0)){
        cevapOlustur(res,404,{
            "hata":"enlem ve boylam zorunlu parametreler",
        });
        return;
    }
    try {
        const sonuc=await Mekan.aggregate([
            {
                $geoNear:{
                    near: koordinat,
                    ...geoOptions,
                },
            },
        ]);
        const mekanlar=sonuc.map((mekan) => {
            return {
                mesafe: cevrimler.kilometre2Radyan(mekan.mesafe),
                ad: mekan.ad,
                adres: mekan.adres,
                puan: mekan.puan,
                imkanlar: mekan.imkanlar,
                _id: mekan._id,
            };
        });
        cevapOlustur(res,200,mekanlar);
    }catch(e){
        cevapOlustur(res,404,e);
    }
};


const mekanEkle=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}

const mekanGetir=function(req,res){
    if(req.params && req.params.mekanid){
        Mekan.findById(req.params.mekanid).exec(function(hata,mekan){
            if(!mekan){
                cevapOlustur(res,404,{"hata":"Böyle bir mekan yok"});
            } else if (hata) {
                cevapOlustur(res,404,{"hata":hata});
            } else {
                cevapOlustur(res,200,mekan);
            }

        });
    } else{
        cevapOlustur(res,404,{"hata":"istekte mekanid yok"});
    }


};

const mekanGüncelle=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}

const mekanSil=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}

module.exports={
    mekanEkle,
    mekanGetir,
    mekanGüncelle,
    mekanSil,
    mekanlariListele
}