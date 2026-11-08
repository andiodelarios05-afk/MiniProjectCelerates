const express = require("express");
const router = express.Router();
const pool = require("../db");


function kolomKosong(body) {
    return KOLOM_WAJIB.filter((k) => body[k] === undefined || body[k] === "");
}


// Penanganan Error
function tanganiErrorDatabase(error, res, pesanDefault) {
    // 23505 = UNIQUE duplikat
    if (error.code === "23505") {
        return res.status(409).json({
            message: "Data duplikat: NIK sudah terdaftar"
        });
    }
    // Format tidak valid
    if (["22P02", "22007", "22008", "22001", "23514"].includes(error.code)) {
        return res.status(400).json({
            message: "Format data tidak valid",
            detail: error.message
        });
    }
    console.error("ERROR DATABASE:", error.message);
    return res.status(500).json({ message: pesanDefault });
}


// 1. Mengambil semua data ibu (GET semua)
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
    } 
    // error handling
    catch (error) {
        tanganiErrorDatabase(error, res, "Gagal mengambil data ibu");
    }
});


// 2. Mencari data ibu berdasarkan nama (GET by nama)
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
    } 
    // error handling
    catch (error) {
        tanganiErrorDatabase(error, res, "Gagal mencari data ibu");
    }
});


// 3. Mengambil data ibu berdasarkan ID (GET by ID)
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
    } 
    // error handling
    catch (error) {
        tanganiErrorDatabase(error, res, "Gagal mengambil data ibu");
    }
});


// 4. Membuat data ibu baru (POST)
router.post("/", async (req, res) => {
    const body = req.body || {};
    const kurang = kolomKosong(body);
 
    if (kurang.length > 0) {
        return res.status(400).json({
            message: `Kolom wajib belum diisi: ${kurang.join(", ")}`
        });
    }
 
    const { nik, nama, tanggal_lahir, alamat, no_hp, status_kehamilan, hpl } = body;
 
    try {
        const result = await pool.query(
            `INSERT INTO ibu (nik, nama, tanggal_lahir, alamat, no_hp, status_kehamilan, hpl)
             VALUES ($1, $2, $3, $4, $5, COALESCE($6, 'tidak_hamil'), $7)
             RETURNING *`,
            [nik, nama, tanggal_lahir, alamat ?? null, no_hp ?? null, status_kehamilan ?? null, hpl ?? null]
        );
 
        res.status(201).json({
            message: "Data ibu berhasil dibuat",
            data: result.rows[0]
        });
    } 
    
    // error handling
    catch (error) {
        tanganiErrorDatabase(error, res, "Gagal membuat data ibu");
    }
});
 

// 5. Memperbarui data ibu berdasarkan ID (PUT)
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
 
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID tidak valid"
        });
    }
 
    const body = req.body || {};
    const kurang = kolomKosong(body);
 
    if (kurang.length > 0) {
        return res.status(400).json({
            message: `Kolom wajib belum diisi: ${kurang.join(", ")}`
        });
    }
 
    const { nik, nama, tanggal_lahir, alamat, no_hp, status_kehamilan, hpl } = body;
 
    try {
        const result = await pool.query(
            `UPDATE ibu
             SET nik = $1, nama = $2, tanggal_lahir = $3, alamat = $4, no_hp = $5,
                 status_kehamilan = COALESCE($6, 'tidak_hamil'), hpl = $7
             WHERE id_ibu = $8
             RETURNING *`,
            [nik, nama, tanggal_lahir, alamat ?? null, no_hp ?? null, status_kehamilan ?? null, hpl ?? null, id]
        );
 
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Data ibu tidak ditemukan"
            });
        }
 
        res.json({
            message: "Data ibu berhasil diperbarui",
            data: result.rows[0]
        });
    } 
    // error handling
    catch (error) {
        tanganiErrorDatabase(error, res, "Gagal memperbarui data ibu");
    }
});


// 6. Menghapus data ibu berdasarkan ID (DELETE)
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
 
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID tidak valid"
        });
    }
 
    try {
        const result = await pool.query(
            "DELETE FROM ibu WHERE id_ibu = $1 RETURNING *",
            [id]
        );
 
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Data ibu tidak ditemukan"
            });
        }
 
        res.json({
            message: "Data ibu berhasil dihapus",
            data: result.rows[0]
        });
    } 
    // error handling
        catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Gagal menghapus data ibu"
        });
    }
});


module.exports = router;