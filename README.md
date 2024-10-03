Aplikasi TO-DO
Proyek ini adalah aplikasi web TO-DO full-stack yang memungkinkan pengguna untuk mendaftar, login, dan mengelola aktivitas to-do mereka. Aplikasi ini terdiri dari frontend yang dibangun menggunakan Nuxt.js dan backend yang dibangun menggunakan Express.js dan MongoDB. Proyek ini sudah dikontainerisasi menggunakan Docker sehingga mudah diatur dan dijalankan.

FITUR

Autentikasi Pengguna: Pengguna dapat mendaftar dan login.
Manajemen To-Do: Buat, edit, tandai sebagai selesai/dibatalkan, dan hapus aktivitas to-do.
Pelacakan Status: Setiap tugas memiliki status (selesai, dibatalkan).
Desain Responsif: Frontend sepenuhnya responsif dan ramah untuk mobile.
Penanganan Kesalahan: Penanganan kesalahan dan mekanisme logging yang baik.
Kontainerisasi: Pengaturan menggunakan Docker untuk pengembangan dan deployment yang mudah.

TEKNOLOGI

Frontend: Nuxt.js, Tailwind CSS, TypeScript, Pinia untuk manajemen state
Backend: Express.js, MongoDB, Mongoose, JWT untuk autentikasi
Database: MongoDB
Kontainerisasi: Docker, Docker Compose

PERSYARTAN

Sebelum memulai, pastikan Anda telah menginstal:
Docker: Untuk kontainerisasi.
Docker Compose: Untuk menjalankan aplikasi multi-kontainer Docker.
Instalasi dan Setup
Dengan Docker
Ikuti langkah-langkah berikut untuk menjalankan aplikasi menggunakan Docker:

Clone repository ini:

bash
Salin kode
git clone https://github.com/irfanseptian009/todo-web
cd todo-web-app
Konfigurasikan variabel lingkungan:

Buat file .env untuk backend dan frontend berdasarkan contoh .env.example yang disediakan.
Pada .env backend, atur koneksi MongoDB dan JWT secret.
Pada .env frontend, atur API base URL (misal: http://localhost:5000/api).

Contoh .env

MONGO_URI=mongodb://mongo:27017/todoapp
JWT_SECRET=kunci_rahasia_jwt_anda
PORT=5000

Build dan jalankan kontainer: Dari direktori root, jalankan perintah berikut untuk membangun dan menjalankan aplikasi:
docker-compose up --build

AKSES APLIKASI
Frontend: Buka browser dan akses http://localhost:3000.
Backend: API tersedia di http://localhost:5000/api.
Tanpa Docker
Jika Anda lebih suka menjalankan proyek tanpa Docker, ikuti instruksi berikut:

Backend:

Masuk ke folder backend:
cd backend

Instal dependencies:
npm install

Jalankan server:
npm start

Backend API sekarang berjalan di http://localhost:5000.

Frontend:

Masuk ke folder frontend:
cd frontend

Instal dependencies:
npm install

Jalankan aplikasi Nuxt.js:
npm run dev

Frontend sekarang berjalan di http://localhost:3000.
Variabel Lingkungan
Proyek ini memerlukan beberapa variabel lingkungan yang harus dikonfigurasikan di frontend dan backend.

Backend:

MONGO_URI: String koneksi MongoDB.
JWT_SECRET: Kunci rahasia untuk pembuatan token JWT.
PORT: Port backend (default: 5000).

Frontend:

API_BASE_URL: URL base untuk API backend (misal: http://localhost:5000/api).
Penggunaan
Setelah aplikasi berjalan:

Daftar pengguna: Kunjungi halaman registrasi dan buat akun baru.
Login: Login menggunakan kredensial yang telah Anda buat.
Kelola To-Do:
Buat to-do baru.
Ed kodeit atau hapus to-do yang sudah ada.
Tandai to-do sebagai selesai atau dibatalkan.
Lihat status dari setiap to-do.
Kontribusi
Jika Anda ingin berkontribusi dalam proyek ini:

Fork repository ini.
Buat branch fitur baru (git checkout -b fitur-anda).
Commit perubahan Anda (git commit -m 'Menambahkan fitur baru').
Push ke branch Anda (git push origin fitur-anda).
Buat Pull Request.
