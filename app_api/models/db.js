var mongoose=require("mongoose");
var dbURI="mongodb://localhost/mekanbul";
//var dbURI="mongodb+srv://mekan32:mekan32@mekanbul.d9jbgop.mongodb.net/mekanbul?retryWrites=true&w=majority";

mongoose.connect(dbURI);
function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    });

}
process.on("SIGNIT",function(){
    kapat("uygulama kapatildi",function(){
    process.exit(0);
    });
});
mongoose.connection.on("connected",function(){
console.log(dbURI +"Adresindeki veritabanına bağlandı");
});
mongoose.connection.on("disconnected",function(){
    console.log("baglanti koptu");
});
mongoose.connection.on("error",function(){
        console.log("bağlantı hatası");
});
        

require("./mekansema");
