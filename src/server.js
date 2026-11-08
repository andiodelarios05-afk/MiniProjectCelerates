require("dotenv").config();

const express = require("express");
const app = express();

const ibuRoutes = require("./routes/ibuRoutes");

app.use(express.json());

// Endpoint data ibu
app.use("/ibu", ibuRoutes);

// Halaman utama API
app.get("/", (req, res) => {
    res.json({
        message: "REST API Posyandu berhasil dijalankan",
        endpoints: [
            "GET /ibu",
            "GET /ibu/:id",
            "GET /ibu/search?nama=Siti",
            "POST /ibu",
            "PUT /ibu/:id",
            "DELETE /ibu/:id"
        ]
    });
});


// kalau route tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint tidak ditemukan"
    });
});


// error handling
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        res.status(400).json({
            message: "JSON tidak valid"
        });
    } 
    console.error(err);
    res.status(500).json({
        message: "Terjadi kesalahan pada server"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});