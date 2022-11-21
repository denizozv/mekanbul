var mongoose=require("mongoose");
var Mekan=mongoose.model("mekan");

const cevapOlustur=function(res,status,content){
    res.status(status).json(content);
}

const yorumGetir=function(req,res){
  
    if(req.params && req.params.mekanid && req.params.yorumid){
            Mekan.findById(req.params.mekanid)
            .select("ad yorumlar")
            .exec(function(hata,mekan){
                var cevap,yorum;
                if(!mekan){
                    cevapOlustur(res,404,{
                        "hata":"Böyle bir mekan yok!",
                    });
                    return;
                } else if (hata){
                    cevapOlustur(res,400,hata);
                    return;
                } 
                if(mekan.yorumlar && mekan.yorumlar.length > 0){
                    yorum=mekan.yorumlar.id(req.params.yorumid);
                    if(!yorum){
                        cevapOlustur(res,404,{
                            "hata":"böyle bir yorum yok!"
                        });
                    }
                    else{
                        cevap={
                            mekan:{
                                ad: mekan.ad,
                                id: req.params.mekanid,
                            },
                            yorum:yorum,
                        };
                        cevapOlustur(res,200,cevap);

                    }

                } else{
                    cevapOlustur(res,404,{
                        "hata":"Hic yorum yok",
                    });
                }
            });
    } else{
        cevapOlustur(res,404,{
            "hata":"bulunamadı. mekanid ve yorumid mutlaka girilmeli",
        });
    }

};

const yorumEkle=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}



const yorumSil=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}

const yorumGüncelle=function(req,res){
    cevapOlustur(res,200,{"Durum":"basarili"});
}

module.exports={

    yorumEkle,
    yorumGetir,
    yorumSil,
    yorumGüncelle
}