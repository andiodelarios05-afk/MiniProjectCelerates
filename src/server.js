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
            "GET /ibu/search?nama=Siti"
        ]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});