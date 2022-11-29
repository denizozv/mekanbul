const expect = require("chai").expect;
var adres = "localhost:3000";
const request = require("supertest").agent(adres);
describe("POST /api/mekanlar", function () {
  it("Yeni mekan ekle:", async function () {
    const response = await request.post("/api/mekanlar").send({
      ad: "E9103",
      adres: "SDU Bilgisayar Müh.",
      puan: 0,
      imkanlar: "kahve,çay,ders",
      enlem: 37,
      boylam: 35,
      gunler1: "Pazratesi-Cuma",
      acilis1: "9:00",
      kapanis1: "17:00",
      kapali1: false,
      gunler2: "Cumartesi-Pazar",
      acilis2: "11:00",
      kapanis2: "18:00",
      kapali2: true,
    });
    expect(response.status).to.eql(201);
    process.env.mekanid = response.body._id;
  });
});

describe("GET /api/mekanlar", function () {
  it("Girilen konum civarındaki tüm mekanları listele:", async function () {
    const response = await request.get("/api/mekanlar?enlem=37&boylam=35");
    expect(response.status).to.eql(200);
  });
});

describe("GET /api/mekanlar/:mekanid", function () {
  it("Mekan getir:", async function () {
    const response = await request.get(`/api/mekanlar/${process.env.mekanid}`);
    expect(response.status).to.eql(200);
  });
});

describe("PUT /api/mekanlar/:mekanid", function () {
  it("Mekan Güncelle:", async function () {
    const response = await request
      .put(`/api/mekanlar/${process.env.mekanid}`)
      .send({
        ad: "Gloria Jeans 2",
        adres: "SDU Batı Kampüsü",
        puan: 3,
        imkanlar: "Kahve,Çay,Kek",
        enlem: 38,
        boylam: 34,
        gunler1: "pazartesi-cuma",
        acilis1: "8:10",
        kapanis1: "23:10",
        kapali1: true,
        gunler2: "cumartesi",
        acilis2: "10:30",
        kapanis2: "17:30",
        kapali2: false,
      });
    expect(response.status).to.eql(200);
  });
});

describe("POST /api/mekanlar/:mekanid/yorumlar", function () {
  it("Yorum ekle:", async function () {
    const response = await request
      .post(`/api/mekanlar/${process.env.mekanid}/yorumlar`)
      .send({
        yorumYapan: "DO",
        puan: 1,
        yorumMetni: "Kahveler berbat!",
      });
    process.env.yorumid = response.body._id;
    expect(response.status).to.eql(201);
  });
});

describe("GET /api/mekanlar/:mekanid/yorumlar/:yorumid", function () {
  it("Yorum getir:", async function () {
    const response = await request.get(
      `/api/mekanlar/${process.env.mekanid}/yorumlar/${process.env.yorumid}`
    );
    expect(response.status).to.eql(200);
  });
});

describe("PUT /api/mekanlar/:mekanid/yorumlar/:yorumid", function () {
  it("Yorum güncelle:", async function () {
    const response = await request
      .put(
        `/api/mekanlar/${process.env.mekanid}/yorumlar/${process.env.yorumid}`
      )
      .send({
        yorumYapan: "Mehmet",
        puan: 2,
        yorumMetni: "Kahveler kötü",
      });
    expect(response.status).to.eql(200);
  });
});

describe("DELETE /api/mekanlar/:mekanid/yorumlar/:yorumid", function () {
  it("Yorum sil:", async function () {
    const response = await request.delete(
      `/api/mekanlar/${process.env.mekanid}/yorumlar/${process.env.yorumid}`
    );
    expect(response.status).to.eql(200);
  });
});

describe("DELETE /api/mekanlar/:mekanid", function () {
  it("Mekan sil:", async function () {
    const response = await request.delete(
      `/api/mekanlar/${process.env.mekanid}`
    );
    expect(response.status).to.eql(200);
  });
});
after((done) => {
  done();
});
