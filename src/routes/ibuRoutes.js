const express = require("express");
const router = express.Router();
const pool = require("../db");

// 1. Mengambil semua data ibu
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM ibu ORDER BY id_ibu ASC"
        );

        res.json({
            message: "Berhasil mengambil semua data ibu",
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error("ERROR DATABASE:", error);
        res.status(500).json({
            message: "Gagal mengambil data ibu"
        });
    }
});

// 2. Mencari data ibu berdasarkan nama
router.get("/search", async (req, res) => {
    const nama = (req.query.nama || "").trim();

    if (!nama) {
        return res.status(400).json({
            message: "Masukkan nama untuk pencarian"
        });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM ibu WHERE nama ILIKE $1 ORDER BY nama ASC",
            [`%${nama}%`]
        );

        res.json({
            message: "Hasil pencarian data ibu",
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Gagal mencari data ibu"
        });
    }
});

// 3. Mengambil data ibu berdasarkan ID
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID tidak valid"
        });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM ibu WHERE id_ibu = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Data ibu tidak ditemukan"
            });
        }

        res.json({
            message: "Berhasil mengambil data ibu",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Gagal mengambil data ibu"
        });
    }
});

module.exports = router;