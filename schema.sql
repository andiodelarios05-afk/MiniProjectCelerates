
-- Web App Monitoring Kesehatan Ibu & Anak serta Jadwal Posyandu
-- PostgreSQL

CREATE TABLE ibu (
    id_ibu SERIAL PRIMARY KEY,
    nik CHAR(16) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    alamat TEXT,
    no_hp VARCHAR(15),
    status_kehamilan VARCHAR(20) DEFAULT 'tidak_hamil'
        CHECK (status_kehamilan IN ('hamil', 'tidak_hamil')),
    hpl DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anak (
    id_anak SERIAL PRIMARY KEY,
    id_ibu INT NOT NULL REFERENCES ibu(id_ibu) ON DELETE CASCADE,
    nama VARCHAR(100) NOT NULL,
    jenis_kelamin CHAR(1) NOT NULL CHECK (jenis_kelamin IN ('L', 'P')),
    tanggal_lahir DATE NOT NULL,
    berat_lahir DECIMAL(4,2)
);

CREATE TABLE jadwal_posyandu (
    id_jadwal SERIAL PRIMARY KEY,
    nama_kegiatan VARCHAR(100) NOT NULL,
    tanggal DATE NOT NULL,
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    lokasi VARCHAR(150) NOT NULL,
    keterangan TEXT
);

CREATE TABLE pemeriksaan_ibu (
    id_periksa SERIAL PRIMARY KEY,
    id_ibu INT NOT NULL REFERENCES ibu(id_ibu) ON DELETE CASCADE,
    id_jadwal INT NOT NULL REFERENCES jadwal_posyandu(id_jadwal),
    berat_badan DECIMAL(5,2),
    tekanan_darah VARCHAR(10),
    lila DECIMAL(4,1),
    usia_kehamilan_minggu INT,
    catatan TEXT
);

CREATE TABLE pemeriksaan_anak (
    id_periksa SERIAL PRIMARY KEY,
    id_anak INT NOT NULL REFERENCES anak(id_anak) ON DELETE CASCADE,
    id_jadwal INT NOT NULL REFERENCES jadwal_posyandu(id_jadwal),
    berat_badan DECIMAL(5,2),
    tinggi_badan DECIMAL(5,1),
    lingkar_kepala DECIMAL(4,1),
    imunisasi VARCHAR(100),
    status_gizi VARCHAR(20) DEFAULT 'baik'
        CHECK (status_gizi IN ('baik', 'kurang', 'buruk', 'lebih')),
    catatan TEXT
);
