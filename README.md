# 🖥️ MINI PROJECT: Backend Database & Rest API —  Web App Monitoring Kesehatan Ibu & Anak serta Jadwal Posyandu 

**Program:** Web Development & UIUX Design
**Mentor:** Made Bhaskara
**Anggota Kelompok:**
- Sonia Debora Napitupulu (PM)
- Kornelius Timothy Setiawan (Designer)
- Andi Ode Larios (Coder)
- Riast Dwi Sanditya (Coder)
- Muhammad Kezban Ramadzan (Coder)

---

## ✍🏻 Deskripsi Studi Kasus
Pencatatan kesehatan ibu hamil dan balita di posyandu umumnya masih manual (buku KIA dan kertas). Akibatnya data sulit ditelusuri, riwayat pertumbuhan anak tidak terpantau berkelanjutan, dan informasi jadwal kegiatan sering terlambat sampai ke warga. Web app ini mendigitalkan pencatatan pemeriksaan, memantau status gizi, dan menyediakan jadwal posyandu yang dapat diakses kapan saja.


## 🧑🏻‍⚕️ Pengguna
- Admin/Kader posyandu: mengelola data dan jadwal
- Tenaga kesehatan (bidan): meninjau hasil pemeriksaan
- Ibu/Orang tua: melihat data anak dan jadwal


## 🖥️ Kebutuhan Fungsional
1. Login dan manajemen akun berbasis peran
2. CRUD data ibu dan anak
3. Pencatatan pemeriksaan ibu (berat badan, tekanan darah, LILA, usia kehamilan)
4. Pencatatan pemeriksaan anak (berat, tinggi, lingkar kepala, imunisasi)
5. Grafik pertumbuhan anak dan status gizi
6. CRUD jadwal posyandu dan kalender kegiatan
7. Pengingat jadwal dan imunisasi
8. Laporan rekap bulanan (ekspor PDF/Excel)


## Kebutuhan Non-Fungsional
Responsif (mobile-first), data pribadi terlindungi (password hash, .env tidak di-commit), antarmuka sederhana untuk pengguna awam.


## 📝 Tangkapan Layar:
Di bawah ini merupakan tangkapan layar dari uji coba ke-6 routes API di POSTMAN.
## 1. Metode POST
   <img width="1920" height="1140" alt="POST" src="https://github.com/user-attachments/assets/7077d4be-53d1-4cad-979c-6bb1f1f54e4b" />


## 2. Metode GET semua data
   <img width="1920" height="1140" alt="GET All" src="https://github.com/user-attachments/assets/b3fc297f-9fd5-4505-8b72-12b72ac37886" />


## 3. Metode GET by Nama Produk/Orang
   <img width="1920" height="1140" alt="GET by Nama" src="https://github.com/user-attachments/assets/46ee654b-db66-4ac4-ae77-97cdccb80ffa" />


## 4. Metode GET by ID pada parameter URL
   <img width="1920" height="1140" alt="GET by ID" src="https://github.com/user-attachments/assets/ecc036aa-8daf-4775-a3bf-5c44db4fe05e" />


## 5. Metode PUT
   <img width="1920" height="1140" alt="PUT by ID" src="https://github.com/user-attachments/assets/24be6c4f-5e74-4800-9ae2-4dce00875e85" />

   
## 6. Metode DELETE
   <img width="1920" height="1140" alt="DELETE by ID" src="https://github.com/user-attachments/assets/faa7d84b-710f-4749-a68a-0a3321cf96da" />
