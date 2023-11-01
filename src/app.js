//Nama : Salsabilla ahmad
//NIM  : 21343072
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/prediksiCuaca")

const app = express();
const port = process.env.PORT || 5000

// Mengatur view engine
app.set("view engine", "hbs");

// Mengatur direktori untuk file statis
const direktoriPublic = path.join(__dirname, "../public");
app.use(express.static(direktoriPublic));

// Mengatur direktori views dan partials untuk Handlebars
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);

// Halaman utama
app.get("/", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Salsabilla Ahmad",
  });
});

// Halaman bantuan
app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Bantuan",
    teksBantuan: "Ini Adalah Teks Bantuan",
    nama: "Salsabilla Ahmad",
  });
});

// Halaman Kontak
app.get("/contact", (req, res) => {
  res.render("contact", {
    judul: "Kontak",
    teksBantuan: "Ini Adalah Halaman Kontak Pribadi Caca",
    nama: "Salsabilla Ahmad",
  });
});

// Halaman Berita
app.get("/berita", (req, res) => {
  res.render("berita", {
    judul: "Berita",
    teksBantuan: "Ini Adalah Halaman Berita",
    nama: "Salsabilla Ahmad",
  });
});


// Halaman infoCuaca
app.get('/infocuaca', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Memasukan lokasi yang ingin dicari'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, dataPrediksi) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        prediksiCuaca: dataPrediksi,
        lokasi: location,
        address: req.query.address
      });
    });
  });
});

// Halaman tentang
app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Biodata Diri Caca",
    nama: "Salsabilla Ahmad",
  });
});

// Halaman bantuan (Wildcard route)
app.get("/bantuan/*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Salsabilla Ahmad",
    pesanKesalahan: "Artikel yang dicari tidak ditemukan!",
  });
});

// Halaman kontak 
app.get("/contact/*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Salsabilla Ahmad",
    pesanKesalahan: "Artikel yang dicari tidak ditemukan!",
  });
});

// Halaman berita
app.get("/berita/*", (req, res) => {
  res.sendFile(__dirname + '/src/file_html/berita.hbs');
});

// Wildcard route (kesalahan)
app.get("*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Salsabilla Ahmad",
    pesanKesalahan: "Halaman tidak ditemukan!",
  });
});


// Menjalankan server pada port 5000
app.listen(port, () => {
  console.log("Server berjalan pada port " + port);
});
