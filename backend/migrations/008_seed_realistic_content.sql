-- Sprint 6 realistic seed data for manual QA and demo scenarios.
-- Idempotent by deleting only this seed set before inserting fresh rows.

START TRANSACTION;

DELETE FROM announcement_attachments
WHERE announcement_id IN (
    SELECT id FROM announcements
    WHERE title IN (
        'Jadwal Konseling Pastoral Minggu Ini',
        'Pendaftaran Katekisasi Remaja Angkatan Baru',
        'Penggalangan Dana Diakonia untuk Jemaat Lansia',
        'Perubahan Jadwal Latihan Paduan Suara Gabungan',
        'Undangan Rapat Evaluasi Pelayanan Semester Pertama'
    )
);

DELETE FROM announcements
WHERE title IN (
    'Jadwal Konseling Pastoral Minggu Ini',
    'Pendaftaran Katekisasi Remaja Angkatan Baru',
    'Penggalangan Dana Diakonia untuk Jemaat Lansia',
    'Perubahan Jadwal Latihan Paduan Suara Gabungan',
    'Undangan Rapat Evaluasi Pelayanan Semester Pertama'
);

INSERT INTO announcements (title, content, target_audience, created_at, updated_at) VALUES
('Jadwal Konseling Pastoral Minggu Ini',
'Pelayanan konseling pastoral tersedia pada hari Rabu dan Jumat pukul 17.00-20.00 WIB. Jemaat dapat mendaftar melalui sekretariat gereja.',
'Semua', '2026-05-03 08:00:00', '2026-05-03 08:00:00'),
('Pendaftaran Katekisasi Remaja Angkatan Baru',
'Pendaftaran katekisasi remaja angkatan baru telah dibuka. Orang tua/wali dimohon mendaftarkan anak melalui sekretariat paling lambat 31 Mei 2026. Persyaratan administrasi meliputi fotokopi akta lahir, kartu keluarga, dan pas foto terbaru. Kelas perdana akan dimulai pada minggu pertama Juni dengan pengenalan kurikulum, jadwal pertemuan, serta komitmen kehadiran. Gereja berharap proses katekisasi ini menjadi ruang pembinaan iman yang hangat, disiplin, dan membentuk remaja semakin mengenal Kristus dalam kehidupan sehari-hari.',
'Remaja', '2026-05-03 09:15:00', '2026-05-03 09:15:00'),
('Penggalangan Dana Diakonia untuk Jemaat Lansia',
'Seksi Diakonia membuka penggalangan dana untuk mendukung paket sembako dan pemeriksaan kesehatan sederhana bagi jemaat lansia. Dukungan dapat diberikan melalui amplop diakonia atau transfer ke rekening gereja dengan keterangan DIAKONIA LANSIA.',
'Semua', '2026-05-04 10:00:00', '2026-05-04 10:00:00'),
('Perubahan Jadwal Latihan Paduan Suara Gabungan',
'Latihan dipindahkan ke Sabtu pukul 18.30 WIB.',
'Kaum Ibu', '2026-05-04 12:00:00', '2026-05-04 12:00:00'),
('Undangan Rapat Evaluasi Pelayanan Semester Pertama',
'Majelis, pengurus kategorial, dan koordinator pelayanan diundang menghadiri rapat evaluasi pelayanan semester pertama. Rapat akan membahas capaian program, kendala lapangan, koordinasi antar seksi, serta rencana tindak lanjut untuk pelayanan bulan berikutnya. Setiap seksi dimohon membawa catatan singkat tentang kegiatan yang sudah berjalan, kebutuhan dukungan, dan usulan prioritas. Kehadiran tepat waktu sangat membantu agar seluruh agenda dapat dibahas dengan tertib dan menghasilkan keputusan yang dapat langsung ditindaklanjuti.',
'Kaum Bapak', '2026-05-05 14:30:00', '2026-05-05 14:30:00');

INSERT INTO announcement_attachments (announcement_id, file_name, file_url)
SELECT id, 'formulir-katekisasi-2026.pdf', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
FROM announcements
WHERE title = 'Pendaftaran Katekisasi Remaja Angkatan Baru';

INSERT INTO announcement_attachments (announcement_id, file_name, file_url)
SELECT id, 'agenda-rapat-evaluasi.pdf', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
FROM announcements
WHERE title = 'Undangan Rapat Evaluasi Pelayanan Semester Pertama';

DELETE FROM upcoming_activities
WHERE title IN (
    'Doa Pagi Bersama',
    'Kunjungan Diakonia ke Jemaat Lansia',
    'Latihan Paduan Suara Gabungan',
    'Rapat Panitia Retreat Pemuda',
    'Seminar Keluarga Kristen',
    'Ibadah Padang dan Kebersamaan Jemaat',
    'Bakti Sosial Lingkungan Gereja',
    'Evaluasi Pelayanan Sekolah Minggu'
);

INSERT INTO upcoming_activities (title, date, time_string, location, created_at, updated_at) VALUES
('Doa Pagi Bersama', '2026-05-03', '06.00 WIB', 'Ruang Doa Gereja', '2026-05-03 05:30:00', '2026-05-03 05:30:00'),
('Kunjungan Diakonia ke Jemaat Lansia', '2026-05-04', '10.00 WIB', 'Wilayah Pelayanan II', '2026-05-03 08:30:00', '2026-05-03 08:30:00'),
('Latihan Paduan Suara Gabungan', '2026-05-10', '18.30 WIB', 'Gedung Gereja Utama', '2026-05-03 09:00:00', '2026-05-03 09:00:00'),
('Rapat Panitia Retreat Pemuda', '2026-05-10', '20.00 WIB', 'Ruang Konsistori', '2026-05-03 09:05:00', '2026-05-03 09:05:00'),
('Seminar Keluarga Kristen', '2026-05-17', '09.00-12.00 WIB', 'Aula Serbaguna', '2026-05-03 09:10:00', '2026-05-03 09:10:00'),
('Ibadah Padang dan Kebersamaan Jemaat', '2026-06-07', '07.30 WIB - Selesai', 'Taman Wiladatika Cibubur', '2026-05-03 09:15:00', '2026-05-03 09:15:00'),
('Bakti Sosial Lingkungan Gereja', '2026-05-02', '08.00 WIB', 'Halaman Gereja dan Sekitar', '2026-05-01 08:00:00', '2026-05-01 08:00:00'),
('Evaluasi Pelayanan Sekolah Minggu', '2026-04-27', '13.00 WIB', 'Ruang Sekolah Minggu', '2026-04-20 08:00:00', '2026-04-20 08:00:00');

DELETE FROM ministry_activities
WHERE name IN (
    'Pelayanan Kunjungan Kasih ke Rumah Sakit',
    'Sekolah Minggu Kreatif: Belajar Melalui Cerita',
    'Bakti Sosial dan Pemeriksaan Kesehatan Gratis',
    'Retreat Pemuda: Bertumbuh dalam Pelayanan',
    'Gotong Royong Membersihkan Area Gereja'
);

INSERT INTO ministry_activities (name, image_url, short_caption, content, activity_date, created_at, updated_at) VALUES
('Pelayanan Kunjungan Kasih ke Rumah Sakit',
'/images/ministry1.png',
'Majelis dan tim diakonia mengunjungi jemaat yang sedang menjalani perawatan.',
'Pelayanan kunjungan kasih dilakukan sebagai bentuk pendampingan gereja bagi jemaat yang sedang sakit. Tim membawa dukungan doa, penguatan firman, dan perhatian praktis bagi keluarga. Kunjungan ini juga menjadi pengingat bahwa persekutuan gereja hadir bukan hanya dalam ibadah Minggu, tetapi juga dalam masa sulit yang dialami jemaat.',
'2026-04-19', '2026-04-20 10:00:00', '2026-04-20 10:00:00'),
('Sekolah Minggu Kreatif: Belajar Melalui Cerita',
'/images/ministry2.png',
'Anak-anak belajar kisah Alkitab melalui aktivitas gambar, nyanyian, dan permainan.',
'Kegiatan berlangsung singkat namun penuh sukacita. Guru sekolah minggu mengajak anak-anak memahami kasih Tuhan melalui cerita dan aktivitas kreatif.',
'2026-04-26', '2026-04-26 12:00:00', '2026-04-26 12:00:00'),
('Bakti Sosial dan Pemeriksaan Kesehatan Gratis',
'/images/ministry3.png',
'Pelayanan sosial untuk warga sekitar melalui pembagian paket sembako dan pemeriksaan kesehatan.',
'Gereja mengadakan bakti sosial bagi warga sekitar sebagai wujud nyata pelayanan kasih. Kegiatan dimulai dengan doa bersama, dilanjutkan pemeriksaan tekanan darah, konsultasi kesehatan sederhana, dan pembagian paket sembako. Jemaat dari berbagai kategori ikut terlibat sebagai relawan, mulai dari registrasi, pengaturan antrean, hingga pendampingan lansia. Melalui kegiatan ini, gereja berharap relasi dengan masyarakat sekitar semakin kuat dan kesaksian kasih Kristus dapat dirasakan secara konkret.',
'2026-05-01', '2026-05-01 16:00:00', '2026-05-01 16:00:00'),
('Retreat Pemuda: Bertumbuh dalam Pelayanan',
'/images/event1.png',
'Pemuda gereja mengikuti retreat sehari untuk membangun komitmen pelayanan.',
'Retreat pemuda menjadi ruang refleksi, pembinaan karakter, dan penguatan komitmen melayani. Sesi utama membahas disiplin rohani, kerja sama tim, dan panggilan menjadi berkat di tengah komunitas. Kegiatan ditutup dengan doa komitmen dan rencana tindak lanjut pelayanan pemuda selama tiga bulan ke depan.',
'2026-05-03', '2026-05-03 18:00:00', '2026-05-03 18:00:00'),
('Gotong Royong Membersihkan Area Gereja',
'/images/event2.png',
'Jemaat bersama-sama membersihkan halaman, ruang kelas, dan area parkir gereja.',
'Gotong royong berjalan sederhana dan akrab. Setiap kelompok mengambil area masing-masing sehingga pekerjaan selesai lebih cepat.',
'2026-05-02', '2026-05-02 11:00:00', '2026-05-02 11:00:00');

COMMIT;
