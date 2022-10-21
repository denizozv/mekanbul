var express = require('express');
var router = express.Router();

const anaSayfa = function (req, res, next) {
  res.render('anasayfa',
   { "baslik": "Ana Sayfa",
     "sayfaBaslik":{
      "siteAd":"Mekanbul",
      "slogan":"Civardaki Mekanları Keşfet!"
     },
     "mekanlar":[

      {
        "ad":"Barida Kafe",
        "adres":"Sdü Batı Kampüs",
        "puan":"4",
        "mesafe":"2km",
        "imkanlar":["kahve","Çay","Pasta"]
      },
      {
        "ad":"Gloria Kafe",
        "adres":"Sdü Doğu Kampüs",
        "puan":"4",
        "mesafe":"5km",
        "imkanlar":["kahve","Çay","Pasta"]
      },
     ]
     
  
  
});
}

const mekanBilgisi = function (req, res) {
  res.render('mekanbilgisi',
  { "baslik": "Mekan bilgisi", 
    "mekanBaslik":"Starbucks",
    "mekanDetay":{
      "ad":"Starbucks",
      "adres":"Centrum Garden",
      "puan":"4",
      "saatler":
      [
        {
        "gunler":"pazartesi - cuma",
        "acilis":"9.00",
        "kapanis":"23.00",
        "kapali":"false"
      },
      {
        "gunler":"cumartesi - pazar",
        "acilis":"10.00",
        "kapanis":"23.00",
        "kapali":"false"
      }
      ],
      "imkanlar":["kahve","çay","kek"],
      "koordinatlar":{
        "enlem":"37.7",
        "boylam":"30.5"
      },
      "yorumlar":[
        {
          "yorumYapan":"Deniz Özveren",
          "puan":"3",
          "tarih":"22 Mayıs",
          "yorumMetni":" Çok beğendim"
        },
        {
          "yorumYapan":"Osman",
          "puan":"3",
          "tarih":"19 Ocak",
          "yorumMetni":" Çok beğendim"
        }
        
      ]
    }

});
}

const yorumEkle = function (req, res) {
  res.render('yorumekle', { "title": "Yorum ekle" });
}

module.exports = {

  anaSayfa,
  mekanBilgisi,
  yorumEkle

}