const express = require("express")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger)

const hewan = [
    { id: 1, nama: "Snowy", spesies: "kucing" },
    { id: 2, nama: "Blacki", spesies: "anjing" },
    { id: 3, nama: "Molly", spesies: "kucing" },
    { id: 4, nama: "Milo", spesies: "kelinci" },
    { id: 5, nama: "Rere", spesies: "kucing" },
];

app.get("/", (req, res) => {
    res.json ({
        msg : "hello world"
    })
})

app.get("/hewan", (req,res)=> {
    res.json ({
        msg: "data semua hewan",
        hewan
    })
})

app.post("/inputhewan", postChecker ,(req,res) => {
    let lengthHewan = hewan.length

    const payload = {
        id : lengthHewan+1,
        nama : req.body.hewan,
        spesies : req.body.spesies
    }

    hewan.push(payload)

    res.json({
        msg : "data hewan berhasil ditambahkan",
        hewan
    })
})

app.get ("/hewan/:id", (req, res) => {
    res.json ({
        msg : "Ini adalah data hewan",
        data: hewan[req.params.id]
    })
})

app.put("/hewan/:id", (req, res) => {
    const payload = {
      nama: req.body.namaHewan,
      spesies: req.body.spesies,
    };
  
    console.log(hewan.find((item) => item.id == req.params.id));
  
    hewan[req.params.id - 1].nama = payload.nama;
    hewan[req.params.id - 1].spesies = payload.spesies;
  
    res.json({
      msg: "Data berhasil di update",
      hewan,
    });
  });

app.delete("/hewan/:id", (req,res) => {
    let hapus = hewan.splice(req.params.id - 1,1)

    res.json({
        msg : "data hewan berhasil di hapus",
        data : hewan
    })
})

function logger(req, res, next) {
    console.log("this is logger");
    next();
}  

function postChecker(req, res, next) {
    const payload = {
      nama: req.body.namaHewan,
      spesies: req.body.namaSpesies,
    };
  
    if (
      payload.spesies === "Kucing" ||
      payload.spesies === "anjing" ||
      payload.spesies === "kelinci"
    ) {
      next();
    } else {
      res.sendStatus(400);
    }
  }

app.listen(port, () => {
    console.log("server is listening in port", port)
})